class User {
  constructor(raw = {}) {
    this.id = raw.id ?? raw.userId ?? null;
    this.name = raw.name ?? raw.nickname ?? raw.username ?? '匿名用户';
    this.signature = raw.signature ?? '';
    this.picUrl = raw.avatarUrl ?? raw.picUrl ?? raw.img1v1Url ?? '';
    this.picId = raw.picId ?? null;
    
    this.followCount = raw.followCount ?? 0;
    this.followerCount = raw.followerCount ?? 0;
    this.followed = raw.followed ?? false;
    
    this.vipType = raw.vipType ?? 0; // 0: 普通用户, 1: VIP, 2: VIP
    this.authStatus = raw.authStatus ?? 0;
    this.vipDeadlineTimestamp = raw.vipDeadlineTimestamp ?? null;
    
    this.raw = raw;
  }

  /**
   * 是否为 VIP
   */
  isVIP() {
    return this.vipType > 0;
  }

  /**
   * 获取 VIP 过期时间
   */
  getVIPExpiryDate() {
    if (!this.vipDeadlineTimestamp) return null;
    return DateTimeFormatter.formatDate(this.vipDeadlineTimestamp);
  }

  toString() {
    return this.name;
  }
}