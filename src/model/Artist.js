class Artist {
  constructor(raw = {}) {
    this.id = raw.id ?? null;
    this.name = raw.name ?? raw.nickname ?? raw.artistName ?? '未知艺人';
    this.alias = raw.alia ?? raw.alias ?? [];
    this.picUrl = raw.picUrl ?? raw.img1v1Url ?? null;
    this.raw = raw;
  }

  static fromArray(artistsArr = []) {
    return artistsArr && artistsArr[0] ? new Artist(artistsArr[0]) : new Artist();
  }

  toString() {
    return this.name;
  }
}