import User from './User';
import Music, {MusicRaw} from './Music';
import DateTimeFormatter from './utils';

interface SongListRaw {
    id: string, name?: string, title?: string,
    description?: string, summary?: string, coverImgUrl?: string,
    picUrl?: string, thumbnail?: string, picId?: string, playlistId?: string,
    playCount?: number, followCount?: number, shareCount?: number, commentCount?: number,
    creator?: object, tags?: Array<string>, createTime?: number, updateTime?: number,
    tracks?: Array<MusicRaw>, trackCount?: number,
    subscribed?: boolean, liked?: boolean
}

export default class SongList {

  constructor(public id: string, public name: string, public description: string, public picUrl: string | null,
    public playCount: number, public followCount: number, public shareCount: number,
    public commentCount: number, public creator: User, public tags: Array<string>,
    public createTime: string | null, public updateTime: string | null,
    private songs: Array<Music> | null, public trackCount: number,
    public subscribed: boolean, public liked: boolean) {}

  static fromRaw(raw: SongListRaw, opts = {}) {

    // let musics: Array<Music> | null = Music.fromRawArray(raw.tracks ?? []);
    // if (musics.length === 0) {
    //   musics = null;
    // }
    let musics = null;

    return new SongList(
      raw.id,
      raw.name ?? raw.title ?? '',
      raw.description ?? raw.summary ?? '',
      raw.coverImgUrl ?? raw.picUrl ?? raw.thumbnail ?? '',
      raw.playCount ?? 0,
      raw.followCount ?? 0,
      raw.shareCount ?? 0,
      raw.commentCount ?? 0,
      User.fromRaw(raw.creator ?? { id: 'unknown', name: '未知用户' }),
      raw.tags ?? [],
      DateTimeFormatter.formatDate(raw.createTime ?? null),
      DateTimeFormatter.formatDate(raw.updateTime ?? null),
      musics,
      raw.trackCount ?? 0,
      raw.subscribed ?? false,
      raw.liked ?? false,
    );
  }

  getMusics() {
    if (this.songs === null) {
      this.updateMusics();
    }
    return this.songs;
  }

  async updateMusics() {
    const songService = (await import('@/services/songService')).default;
    let songs = await songService.getSonglistContent(this.id);
    if (songs) {
      this.songs = songs;
    }
  }

  getPicUrl(size: number = 300) {
    if (!this.picUrl) {
      return null;
    }
    else {
      return `${this.picUrl.replace(/^http:/, "https:")}?param=${size}y${size}`;
    }
  }
  /**
   * 添加歌曲
   */
  addSong(music: Music) {

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