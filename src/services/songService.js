// src/services/songService.js
import api from '@/services/api.js';
import { useUserStore } from '@/stores/userStore';

/**
 * Utils
 */
function formatDuration(ms = 0) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatDate(timestamp) {
    if (!timestamp || isNaN(timestamp)) return '';
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
}

/**
 * normalizeSong
 * 统一把各种来源的 song/raw 转换为一致的 view model
 * source 可选：'detail' | 'album' | 'playlist' | 'search' 等（仅作区分用）
 */
function normalizeSong(raw = {}, source = 'unknown', opts = {}) {
    // 支持多种命名差异：ar / artists, al / album, dt / duration
    const artistsArr = raw.ar || raw.artists || raw.arists || raw.artists || [];
    const artist0 = artistsArr && artistsArr[0] ? artistsArr[0] : (raw.artist || {});
    const albumObj = raw.al || raw.album || raw.alb || {};

    const durationMs = raw.dt ?? raw.duration ?? raw.ms ?? 0;
    const publishTs = albumObj.publishTime ?? raw.publishTime ?? raw.publish_ts ?? null;

    // 封面 URL 优先级：opts.picUrl > album.picUrl > album.img1v1Url > raw.coverImgUrl ...
    const picUrl =
        opts.picUrl ||
        albumObj.picUrl ||
        albumObj.img1v1Url ||
        raw.coverImgUrl ||
        raw.picUrl ||
        null;

    return {
        id: raw.id ?? raw.songId ?? null,
        name: raw.name ?? raw.songName ?? raw.title ?? '',
        translatedName:
            raw.tns?.[0] ??
            raw.transNames?.[0] ??
            raw.translatedName ??
            raw.transName ??
            null,
        duration: formatDuration(durationMs),
        durationMs,
        publishDate: formatDate(publishTs),
        artist: {
            id: artist0?.id ?? null,
            name: artist0?.name ?? artist0?.nickname ?? artist0?.artistName ?? '未知艺人',
            alias: artist0?.alia || artist0?.alias || [],
            raw: artist0,
        },
        album: {
            id: albumObj?.id ?? null,
            name: albumObj?.name ?? albumObj?.albumName ?? '未知专辑',
            translatedName:
                albumObj?.tns?.[0] ?? albumObj?.transNames?.[0] ?? null,
            picUrl,
            picId: albumObj?.pic ?? albumObj?.picId ?? null,
            raw: albumObj,
        },
        // 通用额外字段
        mvId: raw.mv ?? raw.mvId ?? 0,
        popularity: raw.pop ?? raw.popularity ?? 0,
        fee: raw.fee ?? raw.privilege?.fee ?? 0,
        no: raw.no ?? raw.trackNumber ?? 0,
        cd: raw.cd ?? '01',
        raw,
    };
}

/**
 * formatSongList
 * 接受各种 shape 的 songs 列表，返回 normalize 后的数组
 */
function formatSongList(rawSongs = {}) {
    const arr = Array.isArray(rawSongs.songs)
        ? rawSongs.songs
        : Array.isArray(rawSongs)
            ? rawSongs
            : [];
    return arr.filter(Boolean).map(s => normalizeSong(s, 'list'));
}

/**
 * formatAlbum
 * 保持原来较为完整的专辑信息格式化
 */
function formatAlbum(albumData = {}) {
    const artist = albumData.artist || (albumData.artists && albumData.artists[0]) || {};
    return {
        id: albumData.id ?? null,
        name: albumData.name ?? '',
        translatedName: albumData.transNames?.[0] ?? null,
        publishDate: formatDate(albumData.publishTime ?? Date.now()),
        artist: {
            id: artist.id ?? null,
            name: artist.name ?? '未知艺人',
            alias: artist.alias || artist.alia || [],
            picUrl: artist.picUrl ?? artist.img1v1Url ?? null,
            raw: artist,
        },
        picUrl: albumData.picUrl ?? albumData.img1v1Url ?? null,
        picId: albumData.pic ?? albumData.picId ?? null,
        picStr: albumData.picId_str ?? albumData.pic_str ?? null,
        blurPicUrl: albumData.blurPicUrl ?? null,
        size: albumData.size ?? 0,
        company: albumData.company ?? null,
        description: albumData.description ?? albumData.briefDesc ?? null,
        type: albumData.type ?? '专辑',
        subType: albumData.subType ?? null,
        info: {
            commentCount: albumData.info?.commentThread?.commentCount ?? 0,
            shareCount: albumData.info?.commentThread?.shareCount ?? 0,
            hotCount: albumData.info?.commentThread?.hotCount ?? 0,
            liked: albumData.info?.liked ?? false,
        },
        paid: albumData.paid ?? false,
        onSale: albumData.onSale ?? false,
        status: albumData.status ?? 0,
        mark: albumData.mark ?? 0,
        raw: albumData,
    };
}

/**
 * formatAlbumWithSongs
 * 处理 album 接口返回（包含 songs） 的情况
 */
async function formatAlbumWithSongs(rawAlbumData = {}) {
    try {
        const albumData = rawAlbumData.album ?? rawAlbumData;
        const albumInfo = formatAlbum(albumData);
        const picurl = albumInfo.picUrl;

        const songs = rawAlbumData.songs ?? rawAlbumData.tracks ?? [];
        const formatted = (songs || []).map(s =>
            normalizeSong(
                {
                    ...s,
                    al: s.al ?? s.album ?? albumData,
                    ar: s.ar ?? s.artists ?? s.artists,
                },
                'album',
                { picUrl: picurl }
            )
        );

        return {
            ...albumInfo,
            songs: formatted,
            total: formatted.length,
        };
    } catch (err) {
        console.error('formatAlbumWithSongs error:', err);
        return { songs: [], total: 0, album: null };
    }
}

/**
 * formatPlayListInfo
 */
function formatPlayListInfo(raw = {}) {
    if (!raw) return null;
    return {
        id: raw.id ?? raw.playlistId ?? null,
        name: raw.name ?? raw.title ?? '',
        description: raw.description ?? raw.summary ?? '',
        picUrl: raw.coverImgUrl ?? raw.picUrl ?? raw.thumbnail ?? '',
        raw,
    };
}

/**
 * getAlbumPicUrl - 简化调用并添加基本的检查
 */
async function getAlbumPicUrl(albumId) {
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
async function getPicUrl(musicInfo = {}, type = 'music', size = 300) {
    const album = musicInfo?.album ?? musicInfo?.raw?.album ?? null;
    const pic = album?.picUrl ?? album?.img1v1Url ?? musicInfo?.picUrl ?? null;
    if (pic) {
        return `${pic.replace(/^http:/, "https:")}?param=${size}y${size}`;
    }
    if (type === 'music' ? album?.id : musicInfo?.id) {
        const url = await getAlbumPicUrl(album.id);
        if (url) return `${url.replace(/^http:/, "https:")}?param=${size}y${size}`;
    }
    return '';
}

/**
 * 高级：搜索接口整合（示例）
 * 这里只保留结构化调用，具体 map 业务与原来相近
 */
async function searchNetease(keywords, limit = 30, offset = 0, type = 'all') {
    try {
        const result = {};
        switch (type) {
            case 'music': {
                const resp = await api.search(keywords, limit, offset, 1);
                const songs = resp?.result?.songs ?? [];
                result.song = { ...resp.result?.song, songs: songs.map(s => normalizeSong(s, 'search')) };
                return result;
            }
            case 'album': {
                const resp = await api.search(keywords, limit, offset, 10);
                const albums = resp?.result?.albums ?? [];
                result.album = { ...resp.result?.album, albums: albums.map(formatAlbum) };
                return result;
            }
            case 'songlist': {
                const resp = await api.search(keywords, limit, offset, 1000);
                const pls = resp?.result?.playlists ?? [];
                result.playList = { ...resp.result?.playList, playLists: pls.map(formatPlayListInfo) };
                return result;
            }
            case 'all': {
                const temp = await api.search(keywords, limit, offset, 1018);
                return {
                    ...temp,
                    song: {
                        ...temp.result?.song,
                        songs: (temp.result?.song?.songs ?? []).map(s => normalizeSong(s, 'search')),
                    },
                    album: {
                        ...temp.result?.album,
                        albums: (temp.result?.album?.albums ?? []).map(formatAlbum),
                    },
                    playList: {
                        ...temp.result?.playList,
                        playLists: (temp.result?.playList?.playLists ?? []).map(formatPlayListInfo),
                    },
                    artist: temp.result?.artist ?? {},
                    type: 'all',
                };
            }
            default:
                console.warn('searchNetease unknown type:', type);
                return {};
        }
    } catch (err) {
        console.error('searchNetease error:', err);
        return {};
    }
}

/**
 * 其余对外 API（保留原来接口名，便于迁移）
 */
export default {
    // 基础格式化工具
    normalizeSong,
    formatSongList,
    formatAlbum,
    formatAlbumWithSongs,
    formatPlayListInfo,

    // API helpers
    getAlbumPicUrl,
    getPicUrl,
    searchNetease,

    // 其他业务 API（示例：保留和改写你原有的函数）
    async getSongDetails(ids) {
        try {
            const resp = await api.getSongDetail(ids);
            // api.getSongDetail 的返回 shape 与原来不同，请根据实际返回调整
            const songs = resp?.songs ?? resp?.songsList ?? resp?.result ?? [];
            return Array.isArray(songs) ? songs.map(s => normalizeSong(s, 'detail')) : [];
        } catch (err) {
            console.error('getSongDetails error:', err);
            return [];
        }
    },

    async getPlaylistDetail(id, s = 8) {
        try {
            const resp = await api.getPlaylistDetail(id, s);
            if (!resp?.playlist) return null;
            const tracks = resp.playlist.tracks ?? resp.playlist.songs ?? [];
            return {
                ...resp.playlist,
                tracks: tracks.map(t => normalizeSong(t, 'playlist')),
            };
        } catch (err) {
            console.error('getPlaylistDetail error:', err);
            return null;
        }
    },

    async getAlbum(id) {
        try {
            return await formatAlbumWithSongs(await api.getAlbum(id));
        } catch (err) {
            console.error('getAlbum error:', err);
            return { album: null, songs: [], total: 0 };
        }
    },

    /**
     * 获取歌曲播放 URL
     * @param {string|number} id - 歌曲 ID
     * @param {string} source - 音乐源，默认为 'netease'
     * @param {number} br - 比特率，默认为 320
     * @returns {string|null} 播放 URL 或 null
     */
    async getSongUrl(id, source = 'netease', br = 320) {
        try {
            const response = await api.gdstudioGetSong(source, id, br);
            return response?.url || null;
        } catch (error) {
            console.error('Error fetching song URL:', error.message);
            return null;
        }
    },

    /**
     * 获取歌词
     * @param {string|number} id - 歌曲 ID
     * @param {string} source - 音乐源，默认为 'netease'
     * @returns {Object|null} 歌词数据或 null
     */
    async getSongLyric(id, source = 'netease') {
        try {
            // const response = await api.gdstudioGetLyric(source, id);
            const response = await api.getSongLyric(id);
            return response;
        } catch (error) {
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
    async getArtistAlbums(id, limit = 30, offset = 0) {
        try {
            const response = await api.getArtistAlbums(id, limit, offset);
            if (response?.hotAlbums) {
                // 格式化专辑列表中的歌曲
                const formattedAlbums = await Promise.all(
                    response.hotAlbums.map(formatAlbum)
                );
                return formattedAlbums;
            }
            return [];
        } catch (error) {
            console.error('Error fetching artist albums:', error.message);
            return [];
        }
    },

    /**
     * 获取简要艺术家详情
     * @param {string|number} id - 艺术家 ID
     * @returns {Object|null} 艺术家简要信息或 null
     */
    async getArtistBrief(id) {
        try {
            const response = await api.getArtistAlbums(id, 1, 0);
            if (response?.artist) {
                const artist = response.artist;
                return {
                    ...artist,
                    id: artist.id,
                    name: artist.name,
                    picUrl: artist.picUrl || artist.img1v1Url || null,
                    alias: artist.alias || [],
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching artist brief:', error.message);
            return null;
        }
    },


    /**
     * 获取艺术家详情
     * @param {string|number} id - 艺术家 ID
     * @returns {Object|null} 艺术家详情或 null
     */
    async getArtistDetail(id) {
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
        } catch (error) {
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
    async getUserSonglist(uid, limit = 30, offset = 0) {
        try {
            const response = await api.getUserPlaylist(uid, limit, offset);
            if (response?.playlist) {
                // 格式化歌单
                // const formattedTracks = await formatSongList({ songs: response.playlist });
                return await Promise.all(
                    response.playlist.map(formatPlayListInfo)
                );
            }
            return [];
        } catch (error) {
            console.error('Error fetching user playlist:', error.message);
            return [];
        }
    },
    /**
     * 获取歌单所有歌曲
     * @param {string|number} id - 播放列表 ID
     * @returns {Object|null} 歌单所有歌曲或 null
     */
    async getSonglistContent(id) {
        try {
            const resp = await api.getPlaylistAllTracks(id);
            const songs = resp?.songs ?? [];
            return {
                ...resp,
                songs: songs.map(s => normalizeSong(s, 'songlist')),
                total: (songs || []).length,
            };
        } catch (err) {
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
    async likeSong(id, like = true) {
        const userStore = useUserStore();
        if (!userStore.loggedIn()) {
            throw new Error('未登录');
        }
        try {
            const resp = await api.likeSong(id, userStore.cookies, like);
            if (resp?.code === 200) return true;
            throw new Error(resp?.message || 'likeSong failed');
        } catch (err) {
            console.error('likeSong error:', err);
            throw err;
        }
    },
    /**
 * 获取每日推荐歌单
 * @returns {Object} 接口响应数据
 */
    getDailyRecommendedPlaylists() {
        try {
            const userStore = useUserStore();
            const response = api.getDailyRecommendedPlaylists(userStore.cookies);
            console.log("每日推荐歌单:", response);
            return formatSongList(response);
        } catch (error) {
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
                response.data.dailySongs.map(song => normalizeSong({
                    ...song,
                    // 确保每首歌都有专辑信息，如果歌曲没有 al 字段，使用专辑数据
                    album: song.al || {
                        id: song.al.id,
                        name: song.al.name,
                        tns: song.al.transNames,
                        pic_str: song.al.picId_str,
                        picUrl: song.al.picUrl
                    },
                    // artists: rawAlbumData.artists || [],
                }))
            );
            console.log("每日推荐歌曲:", data);
            return data
        } catch (error) {
            console.error('Error fetching daily recommended songs:', error.message);
            return null;
        }
    },
    // 其他按需封装的函数...
};
