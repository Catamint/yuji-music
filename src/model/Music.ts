import songService from '@/services/songService';
import DateTimeFormatter from './utils';
import defaultCoverImg from '@/assets/image/default_cover.jpg';

interface AlbumInfo {
  id: string;
  name: string;
  picUrl: string | null;
}

interface ArtistInfo {
  id: string;
  name: string;
}

export interface MusicRaw {
    id: string | number, name?: string, songName?: string,
    title?: string, tns?: string[], transNames?: string[], dt?: number,
    duration?: number, ms?: number, al?: AlbumInfo, album?: AlbumInfo,
    alb?: AlbumInfo, ar?: ArtistInfo[], artists?: ArtistInfo[], arists?: ArtistInfo[],
    mv?: number, mvId?: number, pop?: number, popularity?: number,
    fee?: number, privilege?: { fee: number }, no?: number, 
    trackNumber?: number, cd?: string, songId?: string, publishDate?: string
}

export default class Music {

  constructor(
    public id: string, public name: string, public translatedName: string | null, public duration: string, 
    public albumInfo: AlbumInfo, public artistsInfoArr: ArtistInfo[],
    public mvId: number, public popularity: number, public fee: number,
    public no: number, public cd: string, public source: string,
    public playUrl: string | null = null, public lyrics: string | null = null
  ) {}

  toString() {
    return `${this.name} - ${this.artistsInfoArr[0]?.name || '未知艺人'}`;
  }

  getArtistInfo() {
    return this.artistsInfoArr[0];
  }

  getLyrics() {};

  
  getAlbumInfo() {
    return this.albumInfo;
  }

  async updatePicUrl(size: number = 300) {

    const defaultPicUrl = defaultCoverImg;
    if (!this.albumInfo.picUrl) {
      this.albumInfo.picUrl = await songService.getAlbumPicUrl(this.albumInfo.id, size) || defaultPicUrl;
    }
    return `${this.albumInfo.picUrl?.replace(/^http:/, "https:")}?param=${size}y${size}`;

  }

  getPicUrl(size: number = 300) {

    return `${this.albumInfo.picUrl?.replace(/^http:/, "https:")}?param=${size}y${size}`;

  }
  /**
   * 获取完整信息字符串
   */
  getFullInfo() {
    return `${this.name} (${this.duration}) - ${this.artistsInfoArr[0]?.name || '未知艺人'} - ${this.albumInfo.name}`;
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

  static fromRaw(raw: MusicRaw, source = 'unknown', opts = {}) 
  {
    let id = raw.id ?? raw.songId;
    if (!id) {
      throw new Error('Invalid raw music data: missing id');
    }
    return new Music(
      id.toString(),
      raw.name ?? raw.songName ?? raw.title ?? '',
      raw.tns?.[0] ?? raw.transNames?.[0] ?? null,
      DateTimeFormatter.formatDuration(raw.dt ?? raw.duration ?? raw.ms ?? 0),
      raw.al ?? raw.album ?? raw.alb ?? { id: '', name: '未知专辑', picUrl: null },
      raw.ar ?? raw.artists ?? raw.arists ?? [{ id: '', name: '未知艺人' }],
      raw.mv ?? raw.mvId ?? 0,
      raw.pop ?? raw.popularity ?? 0,
      raw.fee ?? raw.privilege?.fee ?? 0,
      raw.no ?? raw.trackNumber ?? 0,
      raw.cd ?? '01',
      source
    );
  }

  static fromRawArray(musicsArr: MusicRaw[] = [], source = 'unknown', opts = {}) {
    return [...musicsArr].map(m => Music.fromRaw(m, source, opts));
  }
}