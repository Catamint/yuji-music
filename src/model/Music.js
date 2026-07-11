import Album from './Album.js';
import Artist from './Artist.js';
import DateTimeFormatter from './utils.js';

class Music {
  constructor(raw = {}, source = 'unknown', opts = {}) {
    this.id = raw.id ?? raw.songId ?? null;
    this.name = raw.name ?? raw.songName ?? raw.title ?? '';
    this.translatedName = raw.tns?.[0] ?? raw.transNames?.[0] ?? null;
    
    const durationMs = raw.dt ?? raw.duration ?? raw.ms ?? 0;
    this.duration = DateTimeFormatter.formatDuration(durationMs);
    
    const albumObj = raw.al ?? raw.album ?? raw.alb ?? {};
    this._album = new Album(albumObj, opts);
    
    const artistsArr = raw.ar ?? raw.artists ?? raw.arists ?? [];
    this.artist = Artist.fromArray(artistsArr);
    
    this.publishDate = albumObj?.publishDate ?? null;
    this.mvId = raw.mv ?? raw.mvId ?? 0;
    this.popularity = raw.pop ?? raw.popularity ?? 0;
    this.fee = raw.fee ?? raw.privilege?.fee ?? 0;
    this.no = raw.no ?? raw.trackNumber ?? 0;
    this.cd = raw.cd ?? '01';
    
    this.source = source;
    this.raw = raw;
  }

  toString() {
    return `${this.name} - ${this.artist.toString()}`;
  }

  /**
   * 获取完整信息字符串
   */
  getFullInfo() {
    return `${this.name} (${this.duration}) - ${this.artist.toString()} - ${this.album.toString()}`;
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