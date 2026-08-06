import Artist from './Artist';
import DateTimeFormatter from './utils';
import Music, { MusicRaw } from './Music';
import EntityStore from './EntityStore';

interface ArtistInfo {
  id: string;
  name: string;
}

interface AlbumRaw {
  id: string, name?: string, albumName?: string, songs?: Array<MusicRaw>,
  tns?: string[], transNames?: string[], publishTime?: string,
  artist?: ArtistInfo, artists?: ArtistInfo[], picUrl?: string, tracks?: Array<MusicRaw>,
  img1v1Url?: string, pic?: string, picId?: string, picId_str?: string,
  pic_str?: string, blurPicUrl?: string, size?: number, company?: string,
  description?: string, briefDesc?: string, type?: string, subType?: string,
  info?: { commentThread: { commentCount: number, shareCount: number, hotCount: number }, liked: boolean },
  paid?: boolean, onSale?: boolean, status?: number, mark?: number
}


export default class Album {

  constructor(public id: string, public name: string, public translatedName: string | null,
    public publishTime: string | null, public artistInfo: ArtistInfo, public musicList: Array<Music> | null,
    public picUrl: string | null, public company: string | null, public type: string, public subType: string | null, 
    public info: { commentCount: number, shareCount: number, hotCount: number, liked: boolean },
    public description: string | null) {}

  // getMusicList() {
  //   if (this.musicList === null) {
  //     this.updateMusicList();
  //   }
  //   return this.musicList;
  // }

  // async updateMusicList() {
  //   const musics = await songService.getAlbumMusicList(this.id);
  //   if (musics) {
  //     this.musicList = musics;
  //   }
  // }

  toString() {
    return `${this.name} - ${this.artistInfo.name}`;
  }

  getArtistInfo() {
    return this.artistInfo;
  }
  
  getPicUrl(size: number = 300) {
    if (!this.picUrl) {
      // songService.getAlbumPicUrl(this.id, size);
      return null;
    }
    return `${this.picUrl.replace(/^http:/, "https:")}?param=${size}y${size}`;
  }

  static async get(id: string, opts = {}): Promise<Album | undefined> {
    const album = EntityStore.getAlbum(id);
    if (album) {
      return album;
    }
    const songService = (await import('@/services/songService')).default;
    const newAlbum = await songService.getAlbum(id);
    if (newAlbum instanceof Album) {
      EntityStore.saveAlbum(newAlbum);
      return newAlbum;
    }
    return undefined;
  }

  static fromRaw(raw: AlbumRaw, opts: { picUrl?: string } = {}): Album {

    let musics: Array<Music> | null = Music.fromRawArray(raw.tracks ?? raw.songs ?? []);
    // if music list is empty, set it to null
    if (musics.length === 0) {
      musics = null;
    }

    return new Album(
      raw.id,
      raw.name ?? raw.albumName ?? '未知专辑',
      raw.tns?.[0] ?? raw.transNames?.[0] ?? null,
      DateTimeFormatter.formatDate(raw.publishTime ?? null),
      raw.artist ?? (raw.artists && raw.artists[0]) ?? { id: '', name: '未知艺人' },
      musics,
      opts.picUrl ?? raw.picUrl ?? raw.img1v1Url ?? null,
      raw.company ?? null,
      raw.type ?? '专辑',
      raw.subType ?? null,
      {
        commentCount: raw.info?.commentThread?.commentCount ?? 0,
        shareCount: raw.info?.commentThread?.shareCount ?? 0,
        hotCount: raw.info?.commentThread?.hotCount ?? 0,
        liked: raw.info?.liked ?? false
      },
      raw.description ?? raw.briefDesc ?? null
    );
  }
}
