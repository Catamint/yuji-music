import request from '@/services/request.js';

const api = {
  // 搜索接口
  search(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type });
    return request(`/search?${params}`);
  },

  cloudSearch(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type });
    return request(`/cloudsearch?${params}`);
  },

  multiMatchSearch(keywords) {
    const params = new URLSearchParams({ keywords });
    return request(`/search/multimatch?${params}`);
  },

  getSongDetail(ids) {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
    return request(`/song/detail?ids=${idsParam}`);
  },

  getPlaylistDetail(id, s = 8) {
    const params = new URLSearchParams({ id, s });
    return request(`/playlist/detail?${params}`);
  },

  getPlaylistAllTracks(id, limit = 100, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return request(`/playlist/track/all?${params}`);
  },

  getPlaylistDynamic(id) {
    const params = new URLSearchParams({ id });
    return request(`/playlist/detail/dynamic?${params}`);
  },

  getAlbum(id) {
    const params = new URLSearchParams({ id });
    return request(`/album?${params}`);
  },

  getAlbumDynamic(id) {
    const params = new URLSearchParams({ id });
    return request(`/album/detail/dynamic?${params}`);
  },

  getArtistAlbums(id, limit = 30, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return request(`/artist/album?${params}`);
  },

  getArtistDetail(id) {
      const params = new URLSearchParams({ id });
      return api.request(`/artist/detail?${params}`);
  },
  // 获取用户歌单
  getUserPlaylist(uid, limit = 30, offset = 0) {
    const params = new URLSearchParams({ uid, limit, offset });
    return request(`/user/playlist?${params}`);
  },
  // 获取歌单所有歌曲
  getPlaylistAllTracks(id, limit = 1000, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset });
    return request(`/playlist/track/all?${params}`);
  },
  // 刷新登录
  refreshLogin() {
    return request('/login/refresh');
  },

  sendCaptcha(phone, ctcode = 86) {
    const params = new URLSearchParams({ phone, ctcode });
    return request(`/captcha/sent?${params}`);
  },

  verifyCaptcha(phone, captcha, ctcode = 86) {
    const params = new URLSearchParams({ phone, captcha, ctcode });
    return request(`/captcha/verify?${params}`);
  },

  cellphoneLogin(phone, password, {countrycode, md5_password, captcha} = {}) {
    const params = new URLSearchParams({ phone, password });
    if (countrycode) params.set('countrycode', countrycode);
    if (md5_password) params.set('md5_password', md5_password);
    if (captcha) params.set('captcha', captcha);
    return request(`/login/cellphone?${params}`);
  },
  
  logout(cookie) {
    const params = new URLSearchParams({ cookie });
    return request(`/login/status?${params}`);
  },

  getUserDetail(cookie, uid) {
    const params = new URLSearchParams({ cookie, uid });
    return request(`/user/detail?${params}`);
  },

  getAccountInfo(cookie) {
    cookie = encodeURIComponent(cookie);
    const params = new URLSearchParams({ cookie });
    return request(`/user/account?${params}`);
  },

  getUserSubcount() {
    return request(`/user/subcount?${params}`);
  },
  
  likeSong(id, cookie, like = true) {
    const params = new URLSearchParams({ id, cookie, like });
    return request(`/like?${params}`);
  },

  // 获取用户收藏的歌曲
  getLikedSongs(uid, cookie) {
    const params = new URLSearchParams({ uid, cookie });
    return request(`/likelist?${params}`);
  },

  getDailyRecommendedPlaylists(cookie) {
    const params = new URLSearchParams({ cookie });
    return request('/recommend/resource?' + params);
  },

  getDailyRecommendedSongs(cookie) {
    const params = new URLSearchParams({ cookie });
    return request('/recommend/songs?' + params);
  },

  // 以下是新增的 gdstudio 接口
  gdstudioSearch(name, source = 'netease', count = 20, pages = 1) {
    const params = new URLSearchParams({ types: 'search', source, name, count, pages });
    return request(`?${params}`, {}, 'gdstudio');
  },

  gdstudioGetSong(source = 'netease', id, br = 320) {
    const params = new URLSearchParams({ types: 'url', source, id, br });
    return request(`?${params}`, {}, 'gdstudio');
  },

  gdstudioGetAlbumPic(source = 'netease', id, size = 300) {
    const params = new URLSearchParams({ types: 'pic', source, id, size });
    return request(`?${params}`, {}, 'gdstudio');
  },

  gdstudioGetLyric(source = 'netease', id) {
    const params = new URLSearchParams({ types: 'lyric', source, id });
    return request(`?${params}`, {}, 'gdstudio');
  },
};


export default api;
