import User from './User';
import Music from './Music';
import DateTimeFormatter from './utils';

export default class SongList {

  constructor(public id: string | null, public name: string, public description: string,
    public coverImgUrl: string, public picId: string | null,
    public playCount: number, public followCount: number, public shareCount: number,
    public commentCount: number, public creator: User, public tags: Array<string>,
    public createTime: string | null, public updateTime: string | null,
    public songs: Array<Music>, public trackCount: number,
    public subscribed: boolean, public liked: boolean,
    public raw: object) {}

  static fromRaw(raw: {
    id?: string, name?: string, title?: string,
    description?: string, summary?: string, coverImgUrl?: string,
    picUrl?: string, thumbnail?: string, picId?: string, playlistId?: string,
    playCount?: number, followCount?: number, shareCount?: number, commentCount?: number,
    creator?: object, tags?: Array<string>, createTime?: number, updateTime?: number,
    tracks?: Array<object>, trackCount?: number,
    subscribed?: boolean, liked?: boolean
  } = {}) {
    return new SongList(
      raw.id ?? raw.playlistId ?? null,
      raw.name ?? raw.title ?? '',
      raw.description ?? raw.summary ?? '',
      raw.coverImgUrl ?? raw.picUrl ?? raw.thumbnail ?? '',
      raw.picId ?? null,
      raw.playCount ?? 0,
      raw.followCount ?? 0,
      raw.shareCount ?? 0,
      raw.commentCount ?? 0,
      User.fromRaw(raw.creator ?? {}),
      raw.tags ?? [],
      DateTimeFormatter.formatDate(raw.createTime ?? null),
      DateTimeFormatter.formatDate(raw.updateTime ?? null),
      Music.fromRawArray(raw.tracks ?? []),
      raw.trackCount ?? 0,
      raw.subscribed ?? false,
      raw.liked ?? false,
      raw
    );
  }

  /**
   * 添加歌曲
   */
  addSong(music: Music) {
    if (music instanceof Music) {
      this.songs.push(music);
      this.trackCount = this.songs.length;
    }
  }

  /**
   * 批量添加歌曲
   */
  addSongs(musics: Music[] = []) {
    musics.forEach(m => this.addSong(m));
  }

  /**
   * 移除歌曲
   */
  removeSong(musicId: string) {
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