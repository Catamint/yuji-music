import { defineStore } from 'pinia';
import type { PluginListenerHandle } from '@capacitor/core';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
import { toast } from 'vue-sonner';
import songService from '@/services/songService';
import Music from '@/model/Music';

export const PlayMode = {
  SEQUENTIAL: '列表循环',
  RANDOM: '随机播放',
  REPEAT_ONE: '单曲循环',
} as const;

export type PlayModeValue = (typeof PlayMode)[keyof typeof PlayMode];

let controlsListener: PluginListenerHandle | null = null;

interface PlayerState {
  audio: HTMLAudioElement;
  playlist: Music[];
  currentIndex: number;
  isPlaying: boolean;
  mode: PlayModeValue;
  volume: number;
  currentTime: number;
  duration: number;
  isInitialized: boolean;
}

function createAudio(): HTMLAudioElement {
  return new Audio();
}

interface StoredTrack {
  id: string;
  name: string;
  translatedName: string | null;
  duration: string;
  albumInfo: { id: string; name: string; picUrl: string | null };
  artistsInfoArr: { id: string; name: string }[];
  mvId: number;
  popularity: number;
  fee: number;
  no: number;
  cd: string;
  source: string;
  playUrl: string | null;
  lyrics: string | null;
}

function musicToPlain(m: Music): StoredTrack {
  return {
    id: m.id,
    name: m.name,
    translatedName: m.translatedName,
    duration: m.duration,
    albumInfo: m.albumInfo,
    artistsInfoArr: m.artistsInfoArr,
    mvId: m.mvId,
    popularity: m.popularity,
    fee: m.fee,
    no: m.no,
    cd: m.cd,
    source: m.source,
    playUrl: m.playUrl,
    lyrics: m.lyrics,
  };
}

function plainToMusic(p: StoredTrack): Music {
  return new Music(
    p.id, p.name, p.translatedName, p.duration,
    p.albumInfo, p.artistsInfoArr,
    p.mvId ?? 0, p.popularity ?? 0, p.fee ?? 0, p.no ?? 0,
    p.cd ?? '01', p.source ?? 'unknown',
    p.playUrl ?? null, p.lyrics ?? null,
  );
}

let lastPersistSig = '';
let lastPersistJson = '';

function serializePlayer(state: any): string {
  const playlist = state.playlist ?? [];
  const sig = `${state.currentIndex}|${state.mode}|${state.volume}|${playlist.length}|${playlist.map((t: Music) => `${t.id}:${t.playUrl}`).join(',')}`;
  if (sig === lastPersistSig) return lastPersistJson;
  lastPersistSig = sig;
  lastPersistJson = JSON.stringify({
    playlist: playlist.map(musicToPlain),
    currentIndex: state.currentIndex,
    mode: state.mode,
    volume: state.volume,
  });
  return lastPersistJson;
}

function deserializePlayer(str: string): Partial<PlayerState> {
  const raw = JSON.parse(str) as { playlist?: StoredTrack[]; currentIndex?: number; mode?: PlayModeValue; volume?: number };
  const playlist = (Array.isArray(raw.playlist) ? raw.playlist : []).map(plainToMusic);
  return {
    playlist,
    currentIndex: playlist.length === 0
      ? -1
      : Math.min(Math.max(Number(raw.currentIndex) || 0, 0), playlist.length - 1),
    mode: Object.values(PlayMode).includes(raw.mode as PlayModeValue) ? (raw.mode as PlayModeValue) : PlayMode.SEQUENTIAL,
    volume: typeof raw.volume === 'number' ? raw.volume : 1,
  };
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => ({
    audio: createAudio(),
    playlist: [],
    currentIndex: -1,
    isPlaying: false,
    mode: PlayMode.SEQUENTIAL,
    volume: 1,
    currentTime: 0,
    duration: 0,
    isInitialized: false,
  }),

  getters: {
    currentTrack: (state) => state.playlist[state.currentIndex] ?? null,
  },

  persist: {
    key: 'player',
    pick: ['playlist', 'currentIndex', 'mode', 'volume'],
    serializer: {
      serialize: serializePlayer,
      deserialize: deserializePlayer,
    },
  },

  actions: {
    initAudio() {
      if (this.isInitialized) return;

      const audio = this.audio;
      audio.volume = this.volume;
      audio.addEventListener('ended', this._onEnded);
      audio.addEventListener('play', this._onPlay);
      audio.addEventListener('pause', this._onPause);
      audio.addEventListener('timeupdate', this._onTimeUpdate);
      audio.addEventListener('loadedmetadata', this._onLoadedMetadata);

      void CapacitorMusicControls.addListener('controlsNotification', this._onControlsEvent)
        .then((listener) => { controlsListener = listener; })
        .catch((error: unknown) => console.warn('媒体通知不可用', error));
      document.addEventListener('controlsNotification', this._onDocumentControlsEvent);
      this.isInitialized = true;
    },

    async destroy() {
      if (!this.isInitialized) return;

      const audio = this.audio;
      audio.pause();
      audio.removeEventListener('ended', this._onEnded);
      audio.removeEventListener('play', this._onPlay);
      audio.removeEventListener('pause', this._onPause);
      audio.removeEventListener('timeupdate', this._onTimeUpdate);
      audio.removeEventListener('loadedmetadata', this._onLoadedMetadata);
      document.removeEventListener('controlsNotification', this._onDocumentControlsEvent);
      await controlsListener?.remove().catch(() => undefined);
      controlsListener = null;
      this.isInitialized = false;
    },

    setPlaylist(playlist: Music[]) {
      this.playlist = [...playlist];
      this.currentIndex = playlist.length ? 0 : -1;
    },

    setSrc(url: string) {
      this.audio.src = url;
      this.audio.load();
    },

    setCurrentTime(time: number) {
      if (this.currentIndex < 0 || !Number.isFinite(time)) return;
      this.audio.currentTime = Math.min(Math.max(time, 0), this.duration || 0);
    },

    setMode(mode: PlayModeValue) {
      if (Object.values(PlayMode).includes(mode)) this.mode = mode;
    },

    async playIndex(index = this.currentIndex) {
      this.initAudio();
      if (index < 0 || index >= this.playlist.length) return;

      this.currentIndex = index;
      const track = this.currentTrack;
      if (!track) return;

      if (!track.playUrl) {
        track.playUrl = await this._resolvePlayUrl(track);
      }
      if (!track.playUrl) {
        toast.error('无法获取歌曲链接');
        return;
      }

      this.setSrc(track.playUrl);
      try {
        await this.audio.play();
      } catch (error) {
        console.error('播放失败', error);
        toast.error('播放失败，请稍后重试');
        return;
      }
      await this._updateMusicControls();
    },

    async play(music: Music) {
      this.playlist = [music];
      this.currentIndex = 0;
      await this.playIndex();
    },

    async playMulti(songList: Music[] | null, index = 0) {
      if (!songList?.length) {
        console.error('歌曲列表不正确');
        return;
      }
      this.playlist = [...songList];
      await this.playIndex(index);
    },

    async play_in_playlist(id: string) {
      const index = this.playlist.findIndex((item) => item.id === id);
      if (index === -1) {
        console.error('歌曲不在播放列表中');
        return;
      }
      await this.playIndex(index);
    },

    pause() {
      this.audio.pause();
    },

    async toggle() {
      if (this.audio.paused) {
        if (this.audio.src) {
          await this.audio.play();
        } else {
          await this.playIndex();
        }
      } else {
        this.pause();
      }
    },

    async next() {
      if (!this.playlist.length) return;
      if (this.mode === PlayMode.REPEAT_ONE) return this.playIndex(this.currentIndex);
      const index = this.mode === PlayMode.RANDOM
        ? Math.floor(Math.random() * this.playlist.length)
        : (this.currentIndex + 1) % this.playlist.length;
      await this.playIndex(index);
    },

    async prev() {
      if (!this.playlist.length) return;
      const index = this.mode === PlayMode.RANDOM
        ? Math.floor(Math.random() * this.playlist.length)
        : (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
      await this.playIndex(index);
    },

    put_in_playlist(song: Music) {
      const existingIndex = this.playlist.findIndex((item) => item.id === song.id);
      if (existingIndex !== -1) {
        this.playlist.splice(existingIndex, 1);
        if (existingIndex < this.currentIndex) this.currentIndex--;
      }
      if (this.currentIndex === -1) {
        this.playlist.push(song);
        this.currentIndex = 0;
        void this.playIndex();
        return;
      }
      this.playlist.splice(this.currentIndex + 1, 0, song);
      toast.success('已添加到下一首播放');
    },

    del_from_list(id: string) {
      const index = this.playlist.findIndex((item) => item.id === id);
      if (index === -1) return;
      const wasCurrent = index === this.currentIndex;
      this.playlist.splice(index, 1);
      if (!this.playlist.length) {
        this.currentIndex = -1;
        this.pause();
        this.audio.removeAttribute('src');
        this.audio.load();
      } else if (index < this.currentIndex) {
        this.currentIndex--;
      } else if (wasCurrent && this.currentIndex >= this.playlist.length) {
        this.currentIndex = this.playlist.length - 1;
      }
    },

    async _resolvePlayUrl(track: Music) {
      for (let attempt = 0; attempt < 2; attempt++) {
        const url = await songService.getSongUnblockUrl(track.id);
        if (url) return url;
        toast.error(`无法获取歌曲链接，重试 ${attempt + 1} 次`);
      }
      return null;
    },

    _onEnded() {
      void this.next();
    },

    _onPlay() {
      this.isPlaying = true;
      CapacitorMusicControls.updateIsPlaying({ isPlaying: true });
    },

    _onPause() {
      this.isPlaying = false;
      CapacitorMusicControls.updateIsPlaying({ isPlaying: false });
    },

    _onTimeUpdate() {
      this.currentTime = this.audio.currentTime;
    },

    _onLoadedMetadata() {
      this.duration = Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
    },

    _onControlsEvent(action: { message?: string }) {
      switch (action.message) {
        case 'music-controls-play':
          if (this.audio.paused) {
            if (this.audio.src) void this.audio.play();
            else void this.playIndex();
          }
          break;
        case 'music-controls-pause': this.pause(); break;
        case 'music-controls-next': void this.next(); break;
        case 'music-controls-previous': void this.prev(); break;
        case 'music-controls-toggle-play-pause': void this.toggle(); break;
        case 'music-controls-destroy':
          this.pause();
          void CapacitorMusicControls.destroy().catch(() => undefined);
          break;
      }
    },

    _onDocumentControlsEvent(event: Event) {
      const evt = event as unknown as { message?: unknown; detail?: unknown };
      const payload = typeof evt.message === 'string' ? evt.message : evt.detail;
      if (typeof payload === 'string') {
        this._onControlsEvent({ message: payload });
      } else if (payload && typeof payload === 'object') {
        this._onControlsEvent(payload as { message?: string });
      }
    },

    async _updateMusicControls() {
      const track = this.currentTrack;
      if (!track) return;
      const artist = track.getArtistInfo()?.name || '未知艺人';
      try {
        await CapacitorMusicControls.destroy();
        await CapacitorMusicControls.create({
          track: track.name,
          artist,
          cover: track.getPicUrl() || '',
          album: track.albumInfo.name || '',
          isPlaying: !this.audio.paused,
          dismissable: true,
          hasPrev: true,
          hasNext: true,
          hasClose: true,
          hasScrubbing: false,
          ticker: `正在播放: "${track.name}"`,
          playIcon: 'media_play',
          pauseIcon: 'media_pause',
          prevIcon: 'media_prev',
          nextIcon: 'media_next',
          closeIcon: 'media_close',
          notificationIcon: 'notification',
        });
      } catch (error) {
        console.warn('媒体通知不可用', error);
      }
    },
  },
});
