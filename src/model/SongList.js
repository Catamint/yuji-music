import User from './User.js';
import Music from './Music.js';
import DateTimeFormatter from './utils.js';

class SongList {
  constructor(raw = {}) {
    this.id = raw.id ?? raw.playlistId ?? null;
    this.name = raw.name ?? raw.title ?? '';
    this.description = raw.description ?? raw.summary ?? '';
    this.picUrl = raw.coverImgUrl ?? raw.picUrl ?? raw.thumbnail ?? '';
    this.picId = raw.picId ?? null;
    
    this.playCount = raw.playCount ?? 0;
    this.followCount = raw.followCount ?? 0;
    this.shareCount = raw.shareCount ?? 0;
    this.commentCount = raw.commentCount ?? 0;
    
    this.creator = new User(raw.creator ?? {});
    this.tags = raw.tags ?? [];
    this.createTime = DateTimeFormatter.formatDate(raw.createTime);
    this.updateTime = DateTimeFormatter.formatDate(raw.updateTime);
    
    this.songs = [];
    this.trackCount = raw.trackCount ?? 0;
    
    this.subscribed = raw.subscribed ?? false;
    this.liked = raw.liked ?? false;
    
    this.raw = raw;
  }

  /**
   * 添加歌曲
   */
  addSong(music) {
    if (music instanceof Music) {
      this.songs.push(music);
      this.trackCount = this.songs.length;
    }
  }

  /**
   * 批量添加歌曲
   */
  addSongs(musics = []) {
    musics.forEach(m => this.addSong(m));
  }

  /**
   * 移除歌曲
   */
  removeSong(musicId) {
    this.songs = this.songs.filter(s => s.id !== musicId);
    this.trackCount = this.songs.length;
  }

  /**
   * 获取所有歌曲
   */
  getSongs() {
    return [...this.songs];
  }

  /**
   * 清空歌曲列表
   */
  clear() {
    this.songs = [];
    this.trackCount = 0;
  }

  toString() {
    return `${this.name} (${this.trackCount}首歌曲) - 创建者: ${this.creator.toString()}`;
  }
}