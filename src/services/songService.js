// src/services/songService.js
import api from '@/services/api.js';

/**
 * 将毫秒转换为 mm:ss 格式
 * @param {number} ms
 * @returns {string}
 */
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 将时间戳转换为 yyyy-MM-dd 格式
 * @param {number} timestamp
 * @returns {string}
 */
function formatDate(timestamp) {
    if (!timestamp || isNaN(timestamp)) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
}

/**
 * 格式化单个歌曲数据
 * @param {Object} song - 原始歌曲数据
 * @returns {Object} 格式化后的歌曲数据
 */
async function formatSong(song) {
    const artist = song.artists?.[0] || {};
    const album = song.album || {};
    return {
        id: song.id,
        name: song.name,
        translatedName: song.transNames?.[0] || null,
        publishDate: formatDate(album.publishTime),
        duration: formatDuration(song.duration),
        artist: {
            id: artist.id || null,
            name: artist.name || '未知艺人',
        },
        album: {
            id: album.id || null,
            name: album.name || '未知专辑',
            translatedName: album.transNames?.[0] || null,
            img: song.album?.img || null,
            picId: album?.picId || null,
            picStr: album?.picStr || null,
        },
    };
}

/**
 * 格式化歌曲列表
 * @param {Object} rawSongs - 原始歌曲列表数据
 * @returns {Array} 格式化后的歌曲列表
 */
async function formatSongList(rawSongs = { songs: [] }) {
    if (!rawSongs.songs || !Array.isArray(rawSongs.songs)) {
        console.warn('Invalid song list format:', rawSongs);
        return [];
    }

    // 过滤掉无效的歌曲数据
    const songs = rawSongs.songs.filter(song => song && typeof song === 'object');

    // 使用 Promise.all 等待所有异步操作完成
    return Promise.all(songs.map(formatSong));
}

/**
 * 格式化专辑信息
 * @param {Object} albumData - 原始专辑数据
 * @returns {Object} 格式化后的专辑数据
 */
async function formatAlbum(albumData) {
    const artist = albumData.artist || albumData.artists?.[0] || {};

    return {
        id: albumData.id,
        name: albumData.name,
        translatedName: albumData.transNames?.[0] || null,
        publishDate: formatDate(albumData.publishTime || Date.now()),
        artist: {
            id: artist.id || null,
            name: artist.name || '未知艺人',
            alias: artist.alias || [],
            picUrl: artist.picUrl || artist.img1v1Url || null,
        },
        // 使用专辑的 picUrl 或构建 URL
        picUrl: albumData.picUrl || albumData.img1v1Url || null,
        picId: albumData.pic || albumData.picId || null,
        picStr: albumData.picId_str || null,
        blurPicUrl: albumData.blurPicUrl || null,
        size: albumData.size || 0,           // 专辑歌曲数量
        company: albumData.company || null,   // 发行公司
        description: albumData.description || null, // 专辑描述
        briefDesc: albumData.briefDesc || null, // 简要描述
        type: albumData.type || '专辑',      // 专辑类型
        subType: albumData.subType || null,   // 子类型
        // 统计信息
        info: {
            commentCount: albumData.info?.commentThread?.commentCount || 0,
            shareCount: albumData.info?.commentThread?.shareCount || 0,
            hotCount: albumData.info?.commentThread?.hotCount || 0,
            liked: albumData.info?.liked || false,
        },
        // 销售信息
        paid: albumData.paid || false,
        onSale: albumData.onSale || false,
        status: albumData.status || 0,
        mark: albumData.mark || 0,
    };
}

/**
 * 格式化专辑中的歌曲数据 (适配 ar/al 格式)
 * @param {Object} song - 原始歌曲数据 (来自专辑接口)
 * @returns {Object} 格式化后的歌曲数据
 */
async function formatAlbumSong(song, picurl='') {
    // 处理艺术家信息 - 优先使用 ar 字段，然后是 artists
    const artist = song.ar?.[0] || song.artists?.[0] || {};
    // 处理专辑信息 - 优先使用 al 字段，然后是 album
    const album = song.al || song.album || {};

    return {
        id: song.id,
        name: song.name,
        translatedName: song.tns?.[0] || song.transNames?.[0] || null,
        publishDate: formatDate(album.publishTime || Date.now()),
        duration: formatDuration(song.dt || song.duration || 0),
        artist: {
            id: artist.id || null,
            name: artist.name || '未知艺人',
            alias: artist.alia || artist.alias || [],
        },
        album: {
            id: album.id || null,
            name: album.name || '未知专辑',
            translatedName: album.tns?.[0] || album.transNames?.[0] || null,
            // 构建专辑封面 URL
            img: picurl || song.album?.picUrl || artist.img1v1Url || null,
            picId: album.pic || album.picId || null,
            picStr: album.pic_str || null,
        },
        fee: song.fee || song.privilege?.fee || 0,    // 收费类型
        mvId: song.mv || 0,              // MV ID
        popularity: song.pop || 0,       // 流行度
        no: song.no || 0,                // 专辑中的曲目号
        cd: song.cd || '01',             // CD编号
    };
}

/**
 * 格式化专辑歌曲列表 (专门处理从专辑接口返回的数据)
 * @param {Object} rawAlbumData - 原始专辑数据
 * @returns {Object} 格式化后的专辑数据，包含歌曲列表
 */
async function formatAlbumWithSongs(rawAlbumData) {
    try {
        // 格式化专辑基本信息
        const albumInfo = await formatAlbum(rawAlbumData.album || rawAlbumData);
        const picurl = albumInfo.picUrl;
        // 格式化歌曲列表
        const songs = rawAlbumData.songs || [];
        const formattedSongs = await Promise.all(
            songs.map(song => formatAlbumSong({
                ...song,
                // 确保每首歌都有专辑信息，如果歌曲没有 al 字段，使用专辑数据
                album: song.al || {
                    id: rawAlbumData.id,
                    name: rawAlbumData.name,
                    tns: rawAlbumData.transNames,
                    pic_str: rawAlbumData.picId_str,
                    pic: rawAlbumData.pic
                },
                artists: rawAlbumData.artists || [],
            }, picurl))
        );

        return {
            ...albumInfo,
            songs: formattedSongs,
            total: songs.length
        };
    } catch (error) {
        console.error('Error formatting album with songs:', error);
        return {
            songs: [],
            total: 0
        };
    }
}

async function formatPlayListInfo(rawPlaylist) {
    if (!rawPlaylist) {
        console.warn('Invalid playlist format:', rawPlaylist);
        return null;
    }
    const formattedPlaylist = {
        ...rawPlaylist,
        id: rawPlaylist.id,
        name: rawPlaylist.name,
        description: rawPlaylist.description || '',
        img: rawPlaylist.coverImgUrl || '',
    }
    return formattedPlaylist;
}

// 统一导出所有API接口
export default {
    /**
     * 格式化单个歌曲数据
     * @param {Object} song - 原始歌曲数据
     * @returns {Object} 格式化后的歌曲数据
     */
    formatSong,

    /**
     * 格式化歌曲列表
     * @param {Object} rawSongs - 原始歌曲列表数据
     * @returns {Array} 格式化后的歌曲列表
     */
    formatSongList,

    /**
     * 获取专辑封面图片 URL
     * @param {string|number} picId - 图片 ID
     * @param {string} source - 音乐源，默认为 'netease'
     * @param {number} size - 图片尺寸，默认为 300
     * @returns {string|null} 图片 URL 或 null
     */
    async getAlbumPicUrl(albumId, source = 'netease') {
        try {
            const response = await this.getAlbum(albumId);
            if (!response) {
                console.error('获取专辑信息失败:', response);
                return null;
            }
            // 使用专辑的 picUrl 或构建 URL
            const picUrl = response.picUrl || null;
            if (!picUrl) {
                console.warn('专辑没有封面图片:', response.album);
                return null;
            }
            console.log(`获取专辑图片 URL: ${picUrl}`);
            return picUrl;
        } catch (error) {
            console.error('Error fetching album pic:', error.message);
            return null;
        }
    },

    /**
     * 显示指定大小的图片
     * @param {string|number} picUrl - 图片 url
     * @param {number} size - 图片尺寸，默认为 300
     * @returns {string} 格式化后的图片 URL
     */
    async getPicUrl(musicInfo, size = 300) {
        if (!musicInfo || !musicInfo.album || !musicInfo.album.id) {
            console.warn('音乐信息或专辑图片 URL 不正确:', musicInfo);
            return '';
        } else if (musicInfo.album.img || musicInfo.album.picUrl) {
            return `${musicInfo.album.img || musicInfo.album.picUrl}?param=${size}y${size}`;
        } else {
            const url = await this.getAlbumPicUrl(musicInfo.album.id);
            console.log(`获取专辑图片 URL: ${url}`);
            if (!url) {
                console.warn('无法获取专辑图片 URL:', musicInfo.album.id);
                return '';
            }
            return `${url}?param=${size}y${size}`;
        }
    },

    /**
     * 搜索歌曲 (网易云接口)
     * @param {string} keywords - 搜索关键词
     * @param {number} limit - 返回数量，默认为 30
     * @param {number} offset - 偏移量，默认为 0
     * @param {number} type - 搜索类型，默认为 1
     * @returns {Array} 格式化后的歌曲列表
     */
    async searchNetease(keywords, limit = 30, offset = 0, type = 1) {
        try {
            const response = await api.search(keywords, limit, offset, type);
            switch (type) {
                case 1: // 歌曲
                    return await formatSongList(response?.result || { songs: [] });
                case 10: // 专辑
                    return await Promise.all(
                        response?.result?.map(formatAlbum) || []
                    );
                case 100: // 歌手
                    return response?.result?.artists || [];
                case 1000: // 歌单
                    return response?.result?.playlists || [];
                case 1018: // 综合
                    const songs = response?.result?.song.songs || [];
                    const albums = response?.result?.album.albums || [];
                    const artists = response?.result?.artist || [];
                    const playLists = response?.result?.playList?.playLists || [];
                    return {
                        ...response,
                        song: {
                            ...response.result?.song,
                            songs: await formatSongList({ songs }),
                        },
                        album: {
                            ...response.result?.album,
                            albums: await Promise.all(albums.map(formatAlbum)),
                        },
                        playList: {
                            ...response.result?.playList,
                            playLists: await Promise.all(playLists.map(formatPlayListInfo)),
                        },
                    };
                default:
                    console.warn('未知搜索类型:', type);
                    return [];
            }
        } catch (error) {
            console.error('Error searching songs:', error.message);
            return [];
        }
    },

    /**
     * 搜索歌曲 (gdstudio接口)
     * @param {string} keywords - 搜索关键词
     * @param {string} source - 音乐源，默认为 'netease'
     * @param {number} count - 返回数量，默认为 20
     * @param {number} pages - 页码，默认为 1
     * @returns {Array} 格式化后的歌曲列表
     */
    async searchGdstudio(keywords, source = 'netease', count = 20, pages = 1) {
        try {
            const response = await api.gdstudioSearch(keywords, source, count, pages);
            return await formatSongList(response);
        } catch (error) {
            console.error('Error searching songs:', error.message);
            return [];
        }
    },

    /**
     * 获取歌曲详情
     * @param {string|number|Array} ids - 歌曲 ID 或 ID 数组
     * @returns {Array} 格式化后的歌曲列表
     */
    async getSongDetails(ids) {
        try {
            const response = await api.getSongDetail(ids);
            return await formatSongList(response);
        } catch (error) {
            console.error('Error fetching song details:', error.message);
            return [];
        }
    },

    /**
     * 获取歌单详情
     * @param {string|number} id - 歌单 ID
     * @param {number} s - 参数 s，默认为 8
     * @returns {Object} 歌单详情
     */
    async getPlaylistDetail(id, s = 8) {
        try {
            const response = await api.getPlaylistDetail(id, s);
            if (response?.playlist) {
                // 格式化歌单中的歌曲
                const formattedTracks = await formatSongList({ songs: response.playlist.tracks });
                return {
                    ...response.playlist,
                    tracks: formattedTracks
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching playlist detail:', error.message);
            return null;
        }
    },

    /**
     * 获取专辑信息 (更新版本)
     * @param {string|number} id - 专辑 ID
     * @returns {Object} 包含格式化歌曲列表的专辑信息
     */
    async getAlbum(id) {
        try {
            const response = await api.getAlbum(id);
            return await formatAlbumWithSongs(response);
        } catch (error) {
            console.error('Error fetching album:', error.message);
            return {
                album: null,
                songs: [],
                total: 0
            };
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
            const response = await api.gdstudioGetLyric(source, id);
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
            const response = await api.getPlaylistAllTracks(id);
            if (response?.songs) {
                const songs = response.songs || [];
                const formattedSongs = await Promise.all(
                    songs.map(song => formatAlbumSong({
                        ...song,
                        album: song.al || [],
                        artists: song.ar || [],
                    }))
                );
                // const formattedSongs = await formatSongList({ songs: response.songs });
                return {
                    ...response,
                    songs: formattedSongs,
                    total: formattedSongs.length
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching playlist all songs:', error.message);
            return null;
        }
    },
};