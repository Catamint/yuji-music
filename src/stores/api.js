import request from '@/stores/request.js'

const api = {
  search(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type })
    return request(`/search?${params}`)
  },

  cloudSearch(keywords, limit = 30, offset = 0, type = 1) {
    const params = new URLSearchParams({ keywords, limit, offset, type })
    return request(`/cloudsearch?${params}`)
  },

  multiMatchSearch(keywords) {
    const params = new URLSearchParams({ keywords })
    return request(`/search/multimatch?${params}`)
  },

  getSongDetail(ids) {
    const idsParam = Array.isArray(ids) ? ids.join(',') : ids
    return request(`/song/detail?ids=${idsParam}`)
  },

  getPlaylistDetail(id, s = 8) {
    const params = new URLSearchParams({ id, s })
    return request(`/playlist/detail?${params}`)
  },

  getPlaylistAllTracks(id, limit = 100, offset = 0) {
    const params = new URLSearchParams({ id, limit, offset })
    return request(`/playlist/track/all?${params}`)
  },

  getPlaylistDynamic(id) {
    const params = new URLSearchParams({ id })
    return request(`/playlist/detail/dynamic?${params}`)
  },

  getAlbum(id) {
    const params = new URLSearchParams({ id })
    return request(`/album?${params}`)
  },

  getAlbumDynamic(id) {
    const params = new URLSearchParams({ id })
    return request(`/album/detail/dynamic?${params}`)
  },
}

export default api
