export default class User {

  constructor(public id: string, public name: string, public signature: string, public avatarUrl: string,
    public followCount: number, public followerCount: number, public followed: boolean,
    public authStatus: number, public raw: object) {};

  static fromRaw(raw: {id?: string, name?: string, nickname?: string, 
      username?: string, signature?: string, avatarUrl?: string, 
      picUrl?: string, img1v1Url?: string, picId?: string, 
      userId?: string, followCount?: number, followerCount?: number, followed?: boolean,
      authStatus?: number
    } = {}) 
  {
    let id = raw.id ?? raw.userId;
    if (!id) {
      throw new Error('Invalid raw user data: missing id');
    }
    return new User(
      id,
      raw.name ?? raw.nickname ?? raw.username ?? '匿名用户',
      raw.signature ?? '',
      raw.avatarUrl ?? raw.picUrl ?? raw.img1v1Url ?? '',
      raw.followCount ?? 0,
      raw.followerCount ?? 0,
      raw.followed ?? false,
      raw.authStatus ?? 0,
      raw
    );
  }
  
  toString() {
    return this.name;
  }
}