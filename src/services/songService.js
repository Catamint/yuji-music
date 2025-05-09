// src/services/songService.js
import api from '@/stores/api.js';
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
const date = new Date(timestamp);
return date.toISOString().split('T')[0];
}

export async function formatSong(song) {
    const artist = song.artists?.[0] || {};
    const album = song.album || {};
    let picUrl = null;

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
            img: picUrl || artist.img1v1Url || null, // 优先使用 picUrl
            picId: album.picId || null,
        },
    };
}
  
export async function formatSongList(rawSongs = { songs: [] }) {
    if (!rawSongs.songs || !Array.isArray(rawSongs.songs)) {
        return [];
    }

    // 过滤掉无效的歌曲数据
    const songs = rawSongs.songs.filter(song => song && typeof song === 'object');

    // 使用 Promise.all 等待所有异步操作完成
    return Promise.all(songs.map(formatSong));
}

export async function getAlbumPicUrl(picId) {

    try {
        const response = await api.gdstudioGetAlbumPic('netease', picId);
        // console.log('Album Pic Response:', response);
        return response?.url || null; // 确保 response 存在并获取 url
    
    } catch (error) {
        console.error('Error fetching album pic:', error.message);
        return null; // 返回 null 或者其他默认值
    }

}