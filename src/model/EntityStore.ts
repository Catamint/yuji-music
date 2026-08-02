import { Music, Album, Artist, SongList } from './index';

type EntityCache<T extends Music | Album | Artist | SongList> = Map<string, StoreItem<T>>;

interface StoreItem<T extends Music | Album | Artist | SongList> {
    item: T;
    updateTime: number;
}

class EntityStore {
  private musicCache: EntityCache<Music> = new Map();
  private albumCache: EntityCache<Album> = new Map();
  private songListCache: EntityCache<SongList> = new Map();
  private artistCache: EntityCache<Artist> = new Map();

  private save<T extends Music | Album | Artist | SongList>(cache: EntityCache<T>, entity: T): T {
    cache.set(entity.id, { item: entity, updateTime: Date.now() });
    return entity;
  }

  private get<T extends Music | Album | Artist | SongList>(cache: EntityCache<T>, id: string): T | undefined {
    return cache.get(id)?.item;
  }

  private remove<T extends Music | Album | Artist | SongList>(cache: EntityCache<T>, id: string): boolean {
    return cache.delete(id);
  }

  private exists<T extends Music | Album | Artist | SongList>(cache: EntityCache<T>, id: string): boolean {
    return cache.has(id);
  }

  private clear<T extends Music | Album | Artist | SongList>(cache: EntityCache<T>) {
    cache.clear();
  }

  // --- Music ---
  getMusic(id: string): Music | undefined {
    return this.get(this.musicCache, id);
  }

  hasMusic(id: string): boolean {
    return this.exists(this.musicCache, id);
  }

  saveMusic(music: Music): Music {
    return this.save(this.musicCache, music);
  }

  updateMusic(music: Music): Music {
    return this.saveMusic(music);
  }

  removeMusic(id: string): boolean {
    return this.remove(this.musicCache, id);
  }

  createMusic(raw: any, source = 'unknown', opts = {}): Music {
    return this.saveMusic(Music.fromRaw(raw, source, opts));
  }

  getOrCreateMusic(raw: any, source = 'unknown', opts = {}): Music {
    const id = raw.id ?? raw.songId;
    if (!id) {
      throw new Error('Invalid raw music data: missing id');
    }
    const existed = this.getMusic(id);
    return existed ?? this.createMusic(raw, source, opts);
  }

  clearMusic() {
    this.clear(this.musicCache);
  }

  // --- Album ---
  getAlbum(id: string): Album | undefined {
    return this.get(this.albumCache, id);
  }

  hasAlbum(id: string): boolean {
    return this.exists(this.albumCache, id);
  }

  saveAlbum(album: Album): Album {
    return this.save(this.albumCache, album);
  }

  updateAlbum(album: Album): Album {
    return this.saveAlbum(album);
  }

  removeAlbum(id: string): boolean {
    return this.remove(this.albumCache, id);
  }

  createAlbum(raw: any, opts = {}): Album {
    return this.saveAlbum(Album.fromRaw(raw, opts));
  }

  getOrCreateAlbum(raw: any, opts = {}): Album {
    const id = raw.id;
    if (!id) {
      throw new Error('Invalid raw album data: missing id');
    }
    const existed = this.getAlbum(id);
    return existed ?? this.createAlbum(raw, opts);
  }

  clearAlbum() {
    this.clear(this.albumCache);
  }

  // --- Artist ---
  getArtist(id: string): Artist | undefined {
    return this.get(this.artistCache, id);
  }

  hasArtist(id: string): boolean {
    return this.exists(this.artistCache, id);
  }

  saveArtist(artist: Artist): Artist {
    return this.save(this.artistCache, artist);
  }

  updateArtist(artist: Artist): Artist {
    return this.saveArtist(artist);
  }

  removeArtist(id: string): boolean {
    return this.remove(this.artistCache, id);
  }

  createArtist(raw: any): Artist {
    return this.saveArtist(Artist.fromRaw(raw));
  }

  getOrCreateArtist(raw: any): Artist {
    const id = raw.id;
    if (!id) {
      throw new Error('Invalid raw artist data: missing id');
    }
    const existed = this.getArtist(id);
    return existed ?? this.createArtist(raw);
  }

  clearArtist() {
    this.clear(this.artistCache);
  }

  // --- SongList ---
  getSongList(id: string): SongList | undefined {
    return this.get(this.songListCache, id);
  }

  hasSongList(id: string): boolean {
    return this.exists(this.songListCache, id);
  }

  saveSongList(songList: SongList): SongList {
    return this.save(this.songListCache, songList);
  }

  updateSongList(songList: SongList): SongList {
    return this.saveSongList(songList);
  }

  removeSongList(id: string): boolean {
    return this.remove(this.songListCache, id);
  }

  createSongList(raw: any): SongList {
    return this.saveSongList(SongList.fromRaw(raw));
  }

  getOrCreateSongList(raw: any): SongList {
    const id = raw.id ?? raw.playlistId;
    if (!id) {
      throw new Error('Invalid raw song list data: missing id');
    }
    const existed = this.getSongList(id);
    return existed ?? this.createSongList(raw);
  }

  clearSongList() {
    this.clear(this.songListCache);
  }

  clearAll() {
    this.clearMusic();
    this.clearAlbum();
    this.clearArtist();
    this.clearSongList();
  }
}

export default new EntityStore();