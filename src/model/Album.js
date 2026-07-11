import Artist from './Artist.js';
import DateTimeFormatter from './utils.js';
import Music from './Music.js';

class Album {
  constructor(raw = {}, opts = {}) {
    this.id = raw.id ?? null;
    this.name = raw.name ?? raw.albumName ?? '未知专辑';
    this.translatedName = raw.tns?.[0] ?? raw.transNames?.[0] ?? null;
    this.publishDate = DateTimeFormatter.formatDate(raw.publishTime ?? Date.now());
    
    this.artist = new Artist(
      raw.artist ?? (raw.artists && raw.artists[0]) ?? {}
    );
    
    this.picUrl =
      opts.picUrl ??
      raw.picUrl ??
      raw.img1v1Url ??
      this.artist?.picUrl ??
      null;
    
    this.picId = raw.pic ?? raw.picId ?? null;
    this.picStr = raw.picId_str ?? raw.pic_str ?? null;
    this.blurPicUrl = raw.blurPicUrl ?? null;
    
    this.size = raw.size ?? 0;
    this.company = raw.company ?? null;
    this.description = raw.description ?? raw.briefDesc ?? null;
    this.type = raw.type ?? '专辑';
    this.subType = raw.subType ?? null;
    
    this.info = {
      commentCount: raw.info?.commentThread?.commentCount ?? 0,
      shareCount: raw.info?.commentThread?.shareCount ?? 0,
      hotCount: raw.info?.commentThread?.hotCount ?? 0,
      liked: raw.info?.liked ?? false,
    };
    
    this.paid = raw.paid ?? false;
    this.onSale = raw.onSale ?? false;
    this.status = raw.status ?? 0;
    this.mark = raw.mark ?? 0;
    this.raw = raw;
  }

  toString() {
    return `${this.name} - ${this.artist.toString()}`;
  }
}