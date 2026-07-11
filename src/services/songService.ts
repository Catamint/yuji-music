// src/services/songService.ts
import api from '@/services/api.js';
import { useUserStore } from '@/stores/userStore';
import { User, Music, Artist, Album, SongList } from '@/model';
/**
 * Utils
 */
function formatDuration(ms = 0) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatDate(timestamp: number | string | null) {
    timestamp = Number(timestamp);
    if (!timestamp || isNaN(timestamp)) return null;
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
}

/**
 * getAlbumPicUrl - 简化调用并添加基本的检查
 */
async function getAlbumPicUrl(albumId: string | number | null) {
    if (!albumId) return null;
    try {
        const resp = await api.getAlbum(albumId);
        const a = resp?.album ?? resp;
        return a?.picUrl ?? a?.img1v1Url ?? null;
    } catch (err) {
        console.error('getAlbumPicUrl error:', err);
        return null;
    }
}

/**
 * getPicUrl(musicInfo, size)
 * 优化：先尝试直接从 musicInfo.album.picUrl，再去 API 获取
 */
// async function getPicUrl(musicInfo = {}, type = 'music', size = 300) {
//     const album = musicInfo?.album ?? musicInfo?.raw?.album ?? null;
//     const pic = album?.picUrl ?? album?.img1v1Url ?? musicInfo?.picUrl ?? null;
//     if (pic) {
//         return `${pic.replace(/^http:/, "https:")}?param=${size}y${size}`;
//     }
//     if (type === 'music' ? album?.id : musicInfo?.id) {
//         const url = await getAlbumPicUrl(album.id);
//         if (url) return `${url.replace(/^http:/, "https:")}?param=${size}y${size}`;
//     }
//     return '';
// }

/**
 * 高级：搜索接口整合（示例）
 * 这里只保留结构化调用，具体 map 业务与原来相近
 */
async function searchNetease(keywords: string, type = 'all', limit = 30, offset = 0) {
    // try {
        const result = {
            song: {},
            album: {},
            playList: {},
            artist: {},
        };
        switch (type) {
            case 'music': {
                const resp = await api.search(keywords, limit, offset, 1);
                const songs = resp?.result?.songs ?? [];
                result.song = { ...resp.result, songs: Music.fromRawArray(songs, 'search') };
                return result;
            }
            case 'album': {
                const resp = await api.search(keywords, limit, offset, 10);
                const albums = resp?.result?.albums ?? [];
                result.album = { ...resp.result, albums: albums.map(Album.fromRaw) };
                return result;
            }
            case 'songlist': {
                const resp = await api.search(keywords, limit, offset, 1000);
                const pls = resp?.result?.playlists ?? [];
                result.playList = { ...resp.result, playLists: pls.map(SongList.fromRaw) };
                return result;
            }
            case 'all': {
                const temp = await api.search(keywords, limit, offset, 1018);
                return {
                    ...temp,
                    song: {
                        ...temp.result?.song,
                        songs: Music.fromRawArray(temp.result?.song?.songs ?? [], 'search'),
                    },
                    album: {
                        ...temp.result?.album,
                        albums: (temp.result?.album?.albums ?? []).map(Album.fromRaw),
                    },
                    playList: {
                        ...temp.result?.playList,
                        playLists: (temp.result?.playList?.playLists ?? []).map(SongList.fromRaw),
                    },
                    artist: temp.result?.artist ?? {},
                    type: 'all',
                };
            }
            default:
                console.warn('searchNetease unknown type:', type);
                return {};
        }
    // } catch (err) {
    //     console.error('searchNetease error:', err);
    //     return {};
    // }
}

/**
 * 其余对外 API（保留原来接口名，便于迁移）
 */
export default {

    // API helpers
    getAlbumPicUrl,
    // getPicUrl,
    searchNetease,

    // 其他业务 API（示例：保留和改写你原有的函数）
    // async getSongDetails(ids: Array<String>) {
    //     try {
    //         const resp = await api.getSongDetail(ids);
    //         // api.getSongDetail 的返回 shape 与原来不同，请根据实际返回调整
    //         const songs = resp?.songs ?? resp?.songsList ?? resp?.result ?? [];
    //         return Array.isArray(songs) ? songs.map(s => normalizeSong(s, 'detail')) : [];
    //     } catch (err) {
    //         console.error('getSongDetails error:', err);
    //         return [];
    //     }
    // },

    async getPlaylistDetail(id: string, s = 8) {
        try {
            const resp = await api.getPlaylistDetail(id, s);
            if (!resp?.playlist) return null;
            return SongList.fromRaw(resp.playlist);
        } catch (err) {
            console.error('getPlaylistDetail error:', err);
            // 抛出错误
            throw err;
        }
    },

    async getAlbum(id: string) {
        try {
            let response = await api.getAlbum(id);
            let album = await response?.album ?? response;
            return Album.fromRaw(album);
        } catch (err) {
            console.error('getAlbum error:', err);
            return null;
        }
    },

    /**
     * 获取歌曲播放 URL
     * @param {string|number} id - 歌曲 ID
     * @param {string} source - 音乐源，默认为 'netease'
     * @param {number} br - 比特率，默认为 320
     * @returns {string|null} 播放 URL 或 null
     */
    async getSongUrl(id: string | number, source = 'netease', br = 320) {
        try {
            const response = await api.getSong(source, id, br);
            return response?.url || response?.data?.[0]?.url || null;
        } catch (error: any) {
            console.error('Error fetching song URL:', error.message);
            return null;
        }
    },

    /**
     * 获取歌曲解灰播放 URL
     * @param {string|number} id - 歌曲 ID（必选）
     * @returns {string|null} 播放 URL 或 null
     */
    async getSongUnblockUrl(id: string | number) {
        try {
            // 根据 source 参数选择接口路径
            const response = await api.getSongUnblockUrl(id);
            console.log('解锁歌曲链接:', response);
            return response?.data?.url || response?.data || null;
        } catch (error: any) {
            console.error('Error fetching unblock song URL:', error.message);
            return null;
        }
    },

    /**
     * 获取歌词
     * @param {string|number} id - 歌曲 ID
     * @param {string} source - 音乐源，默认为 'netease'
     * @returns {Object|null} 歌词数据或 null
     */
    async getSongLyric(id: string | number, source = 'netease') {
        try {
            // const response = await api.gdstudioGetLyric(source, id);
            const response = await api.getSongLyric(id);
            return response;
        } catch (error: any) {
            console.error('Error fetching song lyric:', error.message);
            return null;
        }
    },

    /**
     * 获取艺术家专辑列表
     * @param {string|number} id - 艺术家 ID
     * @param {number} limit - 返回数量，默认为 30
     * @param {number} offset - 偏移量，默认为 0
     * @returns {Array} 格式化后的专辑列表
     */
    async getArtistAlbums(id: string | number, limit = 30, offset = 0) {
        try {
            const response = await api.getArtistAlbums(id, limit, offset);
            if (response?.hotAlbums) {
                // 格式化专辑列表中的歌曲
                const formattedAlbums = await Promise.all(
                    response.hotAlbums.map(Album.fromRaw)
                );
                return formattedAlbums;
            }
            return [];
        } catch (error: any) {
            console.error('Error fetching artist albums:', error.message);
            return [];
        }
    },

    /**
     * 获取简要艺术家详情
     * @param {string|number} id - 艺术家 ID
     * @returns {Object|null} 艺术家简要信息或 null
     */
    async getArtistBrief(id: string | number) {
        try {
            const response = await api.getArtistAlbums(id, 1, 0);
            if (response?.artist) {
                const artist = response.artist;
                return Artist.fromRaw(artist);
            }
            return null;
        } catch (error: any) {
            console.error('Error fetching artist brief:', error.message);
            return null;
        }
    },


    /**
     * 获取艺术家详情
     * @param {string|number} id - 艺术家 ID
     * @returns {Object|null} 艺术家详情或 null
     */
    async getArtistDetail(id: string | number) {
        try {
            const response = await api.getArtistDetail(id);
            if (response?.artist) {
                const artist = response.artist;
                return {
                    id: artist.id,
                    name: artist.name,
                    picUrl: artist.picUrl || artist.img1v1Url || null,
                    alias: artist.alias || [],
                }
            }
            return null;
        } catch (error: any) {
            console.error('Error fetching artist detail:', error.message);
            return null;
        }
    },
    /**
     * 获取用户歌单
     * @param {string|number} uid - 用户 ID
     * @param {number} limit - 返回数量，默认为 30
     * @param {number} offset - 偏移量，默认为 0
     * @returns {Array} 用户歌单列表
     */
    async getUserSonglist(uid: string | number, limit = 30, offset = 0) {
        try {
            const response = await api.getUserPlaylist(uid, limit, offset);
            if (response?.playlist) {
                // 格式化歌单
                // const formattedTracks = await formatSongList({ songs: response.playlist });
                return await Promise.all(
                    response.playlist.map(SongList.fromRaw)
                );
            }
            return [];
        } catch (error: any) {
            console.error('Error fetching user playlist:', error.message);
            return [];
        }
    },
    /**
     * 获取歌单所有歌曲
     * @param {string|number} id - 播放列表 ID
     * @returns {Object|null} 歌单所有歌曲或 null
     */
    async getSonglistContent(id: string | number) {
        try {
            const resp = await api.getPlaylistAllTracks(id);
            const songs = resp?.songs ?? [];
            return {
                ...resp,
                songs: Music.fromRawArray(songs),
                total: (songs || []).length,
            };
        } catch (err: any) {
            console.error('getSonglistContent error:', err);
            return null;
        }
    },
    /**
     * 喜欢歌曲
     * @param {string|number} id - 歌曲 ID
     * @param {boolean} like - 是否喜欢
     * @returns {boolean}
     */
    async likeSong(id: string | number, like = true) {
        const userStore = useUserStore();

        // TODO: userStore 改成TypeScript
        if (!(userStore as any).loggedIn()) {
            throw new Error('未登录');
        }
        try {
            const resp = await api.likeSong(id, userStore.cookies, like);
            if (resp?.code === 200) return true;
            throw new Error(resp?.message || 'likeSong failed');
        } catch (err: any) {
            console.error('likeSong error:', err);
            throw err;
        }
    },
    /**
 * 获取每日推荐歌单
 * @returns {Object} 接口响应数据
 */
    async getDailyRecommendedPlaylists() {
        try {
            const userStore = useUserStore();
            const response = await api.getDailyRecommendedPlaylists(userStore.cookies);
            console.log("每日推荐歌单:", response);
            return response.map(SongList.fromRaw);
        } catch (error: any) {
            console.error('Error fetching daily recommended playlists:', error.message);
            return null;
        }

    },

    /**
     * 获取每日推荐歌曲
     * @returns {Object} 接口响应数据
     */
    async getDailyRecommendedSongs() {
        try {
            const userStore = useUserStore();
            const response = await api.getDailyRecommendedSongs(userStore.cookies);
            const data = await Promise.all(
                Music.fromRawArray(response.data.dailySongs)
            );
            console.log("每日推荐歌曲:", data);
            return data
        } catch (error: any) {
            console.error('Error fetching daily recommended songs:', error.message);
            return null;
        }
    },
    // 其他按需封装的函数...
};
