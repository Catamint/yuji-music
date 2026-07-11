import Album from './Album';
import Artist from './Artist';
import DateTimeFormatter from './utils';

export default class Music {

  constructor(public id: string | null, public name: string, public translatedName: string | null,
    public duration: string, public album: Album, public artistsArr: Artist[],
    public mvId: number, public popularity: number, public fee: number,
    public no: number, public cd: string, public source: string,
    public raw: object) {}

  static fromRaw(raw: {
    id?: string, name?: string, songName?: string,
    title?: string, tns?: string[], transNames?: string[], dt?: number,
    duration?: number, ms?: number, al?: object, album?: object,
    alb?: object, ar?: object[], artists?: object[], arists?: object[],
    mv?: number, mvId?: number, pop?: number, popularity?: number,
    fee?: number, privilege?: { fee: number }, no?: number, 
    trackNumber?: number, cd?: string, songId?: string, publishDate?: string
  } = {}, source = 'unknown', opts = {}) 
  {
    if (!raw || !raw.id) {
      throw new Error('Invalid raw music data');
    }
    return new Music(
      raw.id ?? raw.songId ?? null,
      raw.name ?? raw.songName ?? raw.title ?? '',
      raw.tns?.[0] ?? raw.transNames?.[0] ?? null,
      DateTimeFormatter.formatDuration(raw.dt ?? raw.duration ?? raw.ms ?? 0),
      Album.fromRaw(raw.al ?? raw.album ?? raw.alb ?? {}, opts),
      Artist.fromRawArray(raw.ar ?? raw.artists ?? raw.arists ?? []),
      raw.mv ?? raw.mvId ?? 0,
      raw.pop ?? raw.popularity ?? 0,
      raw.fee ?? raw.privilege?.fee ?? 0,
      raw.no ?? raw.trackNumber ?? 0,
      raw.cd ?? '01',
      source,
      raw
    );
  }

  static fromRawArray(musicsArr: Object[] = [], source = 'unknown', opts = {}) {
    return [...musicsArr].map(m => Music.fromRaw(m, source, opts));
  }

  toString() {
    return `${this.name} - ${this.artistsArr[0]?.toString() || '未知艺人'}`;
  }

  getLyrics() {};

  /**
   * 获取完整信息字符串
   */
  getFullInfo() {
    return `${this.name} (${this.duration}) - ${this.artistsArr[0]?.toString() || '未知艺人'} - ${this.album.toString()}`;
  }

  /**
   * 是否为 VIP 歌曲
   */
  isVIP() {
    return this.fee === 1;
  }

  /**
   * 是否有 MV
   */
  hasMV() {
    return this.mvId > 0;
  }
}