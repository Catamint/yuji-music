export default class Artist {

  constructor(public id: string | null, public name: string, public alias: string[] = [],
    public picUrl: string | null, public raw: object) {}

  static fromRaw(raw: {
    id?: string, name?: string, nickname?: string,
    artistName?: string, alia?: string[], alias?: string[],
    picUrl?: string, img1v1Url?: string
  } = {}) {
    return new Artist(
      raw.id ?? null,
      raw.name ?? raw.nickname ?? raw.artistName ?? '未知艺人',
      raw.alia ?? raw.alias ?? [],
      raw.picUrl ?? raw.img1v1Url ?? null,
      raw
    );
  }

  toString() {
    return this.name;
  }

  static fromRawArray(artistsArr: Object[] = []) {
    return [...artistsArr].map(a => Artist.fromRaw(a));
  }
}