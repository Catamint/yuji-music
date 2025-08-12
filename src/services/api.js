import request from '@/services/request.js';

const api = {
  // 搜索接口
  async search(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type });
    return await request(`/search?${params}`);
  },
  // 搜索接口(更全)
  async cloudSearch(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type });
    return await request(`/cloudsearch?${params}`);
  },

  async multiMatchSearch(keywords) {
    const params = new URLSearchParams({ keywords });
    return await request(`/search/multimatch?${params}`);
  },

  async getSongDetail(ids) {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
    return await request(`/song/detail?ids=${idsParam}`);
  },

  async getPlaylistDetail(id, s = 8) {
    const params = new URLSearchParams({ id, s });
    return await request(`/playlist/detail?${params}`);
  },

  async getPlaylistAllTracks(id, limit = 100, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return await request(`/playlist/track/all?${params}`);
  },

  async getPlaylistDynamic(id) {
    const params = new URLSearchParams({ id });
    return await request(`/playlist/detail/dynamic?${params}`);
  },

  async getAlbum(id) {
    const params = new URLSearchParams({ id });
    return await request(`/album?${params}`);
  },

  async getAlbumDynamic(id) {
    const params = new URLSearchParams({ id });
    return await request(`/album/detail/dynamic?${params}`);
  },

  async getArtistAlbums(id, limit = 30, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return await request(`/artist/album?${params}`);
  },

  async getArtistDetail(id) {
      const params = new URLSearchParams({ id });
      return await api.request(`/artist/detail?${params}`);
  },
  // 获取用户歌单
  async getUserPlaylist(uid, limit = 30, offset = 0) {
    const params = new URLSearchParams({ uid, limit, offset });
    return await request(`/user/playlist?${params}`);
  },
  // 获取歌单所有歌曲
  async getPlaylistAllTracks(id, limit = 1000, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return await request(`/playlist/track/all?${params}`);
  },
  // 刷新登录
  async refreshLogin() {
    return await request('/login/refresh');
  },

  async sendCaptcha(phone, ctcode = 86) {
    const params = new URLSearchParams({ phone, ctcode });
    return await request(`/captcha/sent?${params}`);
  },

  async verifyCaptcha(phone, captcha, ctcode = 86) {
    const params = new URLSearchParams({ phone, captcha, ctcode });
    return await request(`/captcha/verify?${params}`);
  },

  async cellphoneLogin(phone, password, {countrycode, md5_password, captcha} = {}) {
    const params = new URLSearchParams({ phone, password });
    if (countrycode) params.set('countrycode', countrycode);
    if (md5_password) params.set('md5_password', md5_password);
    if (captcha) params.set('captcha', captcha);
    return await request(`/login/cellphone?${params}`);
  },
  
  async logout(cookie) {
    const params = new URLSearchParams({ cookie });
    return await request(`/login/status?${params}`);
  },

  async getUserDetail(cookie, uid) {
    const params = new URLSearchParams({ cookie, uid });
    return await request(`/user/detail?${params}`);
  },

  async getAccountInfo(cookie) {
    cookie = encodeURIComponent(cookie);
    const params = new URLSearchParams({ cookie });
    return await request(`/user/account?${params}`);
  },

  async getUserSubcount() {
    return await request(`/user/subcount?${params}`);
  },
  
  async likeSong(id, cookie, like = true) {
    const params = new URLSearchParams({ id, cookie, like });
    return await request(`/like?${params}`);
  },

  // 获取用户收藏的歌曲
  async getLikedSongs(uid, cookie) {
    const params = new URLSearchParams({ uid, cookie });
    return await request(`/likelist?${params}`);
  },

  async getDailyRecommendedPlaylists(cookie) {
    const params = new URLSearchParams({ cookie });
    return await request('/recommend/resource?' + params);
  },

  async getDailyRecommendedSongs(cookie) {
    const params = new URLSearchParams({ cookie });
    return await request('/recommend/songs?' + params);
  },

  async getSongLyric(id) {
    const params = new URLSearchParams({ id });
    return await request(`/lyric/new?${params}`);
  },
  
  // 以下是新增的 gdstudio 接口
  async gdstudioSearch(name, source = 'netease', count = 20, pages = 1) {
    const params = new URLSearchParams({ types: 'search', source, name, count, pages });
    return await request(`?${params}`, {}, 'gdstudio');
  },

  async gdstudioGetSong(source = 'netease', id, br = 320) {
    const params = new URLSearchParams({ types: 'url', source, id, br });
    return await request(`?${params}`, {}, 'gdstudio');
  },

  async gdstudioGetAlbumPic(source = 'netease', id, size = 300) {
    const params = new URLSearchParams({ types: 'pic', source, id, size });
    return await request(`?${params}`, {}, 'gdstudio');
  },

  async gdstudioGetLyric(source = 'netease', id) {
    const params = new URLSearchParams({ types: 'lyric/new', source, id });
    return await request(`?${params}`, {}, 'gdstudio');
  },
};


export default api;
