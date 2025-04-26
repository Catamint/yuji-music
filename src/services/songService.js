// src/services/songService.js

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

export function formatSong(song) {
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
      img: album.img1v1Url || artist.img1v1Url || null,
    }
    };
  }
  
export function formatSongList(rawSongs = {songs: []}) {
    if (!rawSongs.songs || !Array.isArray(rawSongs.songs)) {
        return [];
    }

    // 处理可能的空值
    const songs = rawSongs.songs.filter(song => song && typeof song === 'object');

    // 使用 map 方法格式化每首歌
    return rawSongs.songs.map(formatSong)
}

  