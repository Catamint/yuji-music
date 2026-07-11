import Artist from './Artist';
import DateTimeFormatter from './utils';
import Music from './Music';

export default class Album {

  constructor(public id: string | null, public name: string, public translatedName: string | null,
    public publishTime: string | null, public artist: Artist, public picId: string | null,
    public picIdStr: string | null, public blurPicUrl: string | null,
    public size: number, public company: string | null, public type: string,
    public subType: string | null, public info: { commentCount: number, shareCount: number, hotCount: number, liked: boolean },
    public paid: boolean, public onSale: boolean, public status: number,
    public mark: number, public description: string | null, public raw: object) { }

  static fromRaw(raw: {
    id?: string, name?: string, albumName?: string,
    tns?: string[], transNames?: string[], publishTime?: string,
    artist?: object, artists?: object[], picUrl?: string,
    img1v1Url?: string, pic?: string, picId?: string, picId_str?: string,
    pic_str?: string, blurPicUrl?: string, size?: number, company?: string,
    description?: string, briefDesc?: string, type?: string, subType?: string,
    info?: { commentThread: { commentCount: number, shareCount: number, hotCount: number }, liked: boolean },
    paid?: boolean, onSale?: boolean, status?: number, mark?: number
  } = {}, opts: { picUrl?: string } = {}) {
    return new Album(
      raw.id ?? null,
      raw.name ?? raw.albumName ?? '未知专辑',
      raw.tns?.[0] ?? raw.transNames?.[0] ?? null,
      DateTimeFormatter.formatDate(raw.publishTime ?? null),
      Artist.fromRaw(raw.artist ?? (raw.artists && raw.artists[0]) ?? {}),
      raw.pic ?? raw.picId ?? null,
      raw.picId_str ?? raw.pic_str ?? null,
      raw.blurPicUrl ?? null,
      raw.size ?? 0,
      raw.company ?? null,
      raw.type ?? '专辑',
      raw.subType ?? null,
      {
        commentCount: raw.info?.commentThread?.commentCount ?? 0,
        shareCount: raw.info?.commentThread?.shareCount ?? 0,
        hotCount: raw.info?.commentThread?.hotCount ?? 0,
        liked: raw.info?.liked ?? false
      },
      raw.paid ?? false,
      raw.onSale ?? false,
      raw.status ?? 0,
      raw.mark ?? 0,
      raw.description ?? raw.briefDesc ?? null,
      raw
    );
  }

  toString() {
    return `${this.name} - ${this.artist.toString()}`;
  }
}
