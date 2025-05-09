import request from '@/stores/request.js';

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

  // 新增的 gdstudio 接口
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
