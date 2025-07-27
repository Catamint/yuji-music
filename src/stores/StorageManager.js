class StorageManager {
  constructor() {
    this.linkCache = new LinkCache();
    this.songCache = new SongCache();
    this.userPrefs = new UserPrefs();
  }

  // 链接缓存
  async getLink(key) { return this.linkCache.get(key); }
  async setLink(key, val, ttl) { return this.linkCache.set(key, val, ttl); }
  async removeLink(key) { return this.linkCache.remove(key); }

  // 歌曲缓存
  async hasSong(url) { return this.songCache.has(url); }
  async cacheSong(url, response) { return this.songCache.add(url, response); }
  async getSong(url) { return this.songCache.get(url); }
  async removeSong(url) { return this.songCache.remove(url); }

  // 用户偏好（收藏、配置）
  getPref(key) { return this.userPrefs.get(key); }
  setPref(key, val) { return this.userPrefs.set(key, val); }
  removePref(key) { return this.userPrefs.remove(key); }
  listPrefs() { return this.userPrefs.list(); }
  clearPrefs() { return this.userPrefs.clear(); }
}

class UserPrefs {
  constructor(ns = 'app:prefs') { this.ns = ns; }
  _key(key) { return `${this.ns}:${key}`; }

  get(key) {
    const v = localStorage.getItem(this._key(key));
    return v === null ? null : JSON.parse(v);
  }

  set(key, val) {
    localStorage.setItem(this._key(key), JSON.stringify(val));
  }

  remove(key) {
    localStorage.removeItem(this._key(key));
  }

  list() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.ns));
    return keys.map(k => ({
      key: k.replace(`${this.ns}:`, ''),
      value: JSON.parse(localStorage.getItem(k))
    }));
  }

  clear() {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(this.ns));
      keys.forEach(k => localStorage.removeItem(k));
  }
}

class LinkCache {
  constructor(ns = 'app:linkCache') { this.ns = ns; }
  _key(key) { return `${this.ns}:${key}`; }

  async set(key, value, ttlSec = 3600) {
    const record = { value, expires: Date.now() + ttlSec*1e3 };
    localStorage.setItem(this._key(key), JSON.stringify(record));
  }

  async get(key) {
    const item = localStorage.getItem(this._key(key));
    if (!item) return null;
    const { value, expires } = JSON.parse(item);
    if (expires < Date.now()) {
      localStorage.removeItem(this._key(key));
      return null;
    }
    return value;
  }

  async remove(key) {
    localStorage.removeItem(this._key(key));
  }
}

class SongCache {
  constructor(cacheName = 'app-song-cache') {
    this.cacheName = cacheName;
    this.metaDB = new Promise(r => {
      const req = indexedDB.open('app-metadata', 1);
      req.onupgradeneeded = e => {
        e.target.result.createObjectStore('songs', { keyPath: 'url' });
      };
      req.onsuccess = () => r(req.result);
    });
  }

  // 在 Cache API 中缓存响应
  async add(url, response) {
    const cache = await caches.open(this.cacheName);
    await cache.put(url, response.clone());
    // 存入元数据
    const db = await this.metaDB;
    const tx = db.transaction('songs', 'readwrite');
    tx.objectStore('songs').put({ url, timestamp: Date.now() });
    return tx.complete;
  }

  async has(url) {
    const cache = await caches.open(this.cacheName);
    const match = await cache.match(url);
    return !!match;
  }

  async get(url) {
    const cache = await caches.open(this.cacheName);
    const resp = await cache.match(url);
    return resp || null;
  }

  async remove(url) {
    const cache = await caches.open(this.cacheName);
    await cache.delete(url);
    const db = await this.metaDB;
    const tx = db.transaction('songs', 'readwrite');
    tx.objectStore('songs').delete(url);
    return tx.complete;
  }
}
