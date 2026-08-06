import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePlayerStore, PlayMode } from '@/stores/playerStore';
import player2 from '@/stores/player2';

class FakeAudio {
  currentTime = 0;
  duration = 0;
  paused = true;
  src = '';
  volume = 1;
  private listeners: Record<string, Array<(e?: unknown) => void>> = {};

  addEventListener(type: string, cb: (e?: unknown) => void) {
    (this.listeners[type] ??= []).push(cb);
  }

  removeEventListener(type: string, cb: (e?: unknown) => void) {
    this.listeners[type] = (this.listeners[type] ?? []).filter((l) => l !== cb);
  }

  private emit(type: string) {
    for (const l of this.listeners[type] ?? []) l({ type });
  }

  play() {
    this.paused = false;
    this.emit('play');
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
    this.emit('pause');
  }

  load() {}

  removeAttribute(_name: string) {
    this.src = '';
  }
}

const documentListeners: Record<string, Array<(e?: unknown) => void>> = {};
const fakeDocument = {
  addEventListener: (type: string, cb: (e?: unknown) => void) => {
    (documentListeners[type] ??= []).push(cb);
  },
  removeEventListener: (type: string, cb: (e?: unknown) => void) => {
    documentListeners[type] = (documentListeners[type] ?? []).filter((l) => l !== cb);
  },
};

(globalThis as any).Audio = FakeAudio;
(globalThis as any).document = fakeDocument;

vi.mock('@/services/songService', () => ({
  default: {
    getSongUnblockUrl: vi.fn(async () => 'https://example.com/song.mp3'),
    getSongUrl: vi.fn(async () => null),
  },
}));

vi.mock('capacitor-music-controls-plugin', () => ({
  CapacitorMusicControls: {
    addListener: vi.fn(async () => ({ remove: vi.fn(async () => undefined) })),
    updateIsPlaying: vi.fn(),
    destroy: vi.fn(async () => undefined),
    create: vi.fn(async () => undefined),
  },
}));

vi.mock('vue-sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

function makeTrack(id: string, playUrl = ''): any {
  return {
    id,
    name: `Song ${id}`,
    playUrl,
    albumInfo: { name: 'Album' },
    getArtistInfo: () => ({ name: 'Artist' }),
    getPicUrl: () => '',
  };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

let store: ReturnType<typeof usePlayerStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  store = usePlayerStore();
});

describe('playerStore 初始状态', () => {
  it('playlist 为空, currentIndex=-1, 顺序模式, 未初始化', () => {
    expect(store.playlist).toEqual([]);
    expect(store.currentIndex).toBe(-1);
    expect(store.isPlaying).toBe(false);
    expect(store.mode).toBe(PlayMode.SEQUENTIAL);
    expect(store.isInitialized).toBe(false);
  });
});

describe('initAudio/destroy 幂等与资源释放', () => {
  it('重复 initAudio 不会重复绑定事件', async () => {
    store.playlist = [makeTrack('1', 'url1'), makeTrack('2', 'url2'), makeTrack('3', 'url3')];
    store.currentIndex = 0;

    store.initAudio();
    store.initAudio();
    expect(store.isInitialized).toBe(true);

    (store.audio as any).emit('ended');
    await flush();
    expect(store.currentIndex).toBe(1);
  });

  it('destroy 后不再响应音频事件', async () => {
    store.playlist = [makeTrack('1', 'url1'), makeTrack('2', 'url2')];
    store.currentIndex = 0;
    store.initAudio();
    await store.destroy();

    expect(store.isInitialized).toBe(false);
    (store.audio as any).emit('ended');
    await flush();
    expect(store.currentIndex).toBe(0);
  });
});

describe('playIndex 懒加载播放链接', () => {
  it('缺少 playUrl 时通过 songService 解析并播放', async () => {
    store.playlist = [makeTrack('1')];
    await store.playIndex(0);

    expect(store.currentTrack.playUrl).toBe('https://example.com/song.mp3');
    expect(store.audio.src).toBe('https://example.com/song.mp3');
    expect(store.audio.paused).toBe(false);
    expect(store.isPlaying).toBe(true);
  });
});

describe('next/prev 播放模式逻辑', () => {
  it('顺序模式下 next 循环到下一首', async () => {
    store.playlist = [makeTrack('1', 'u1'), makeTrack('2', 'u2'), makeTrack('3', 'u3')];
    store.currentIndex = 0;
    await store.next();
    expect(store.currentIndex).toBe(1);
    await store.next();
    expect(store.currentIndex).toBe(2);
    await store.next();
    expect(store.currentIndex).toBe(0);
  });

  it('顺序模式下 prev 回退并支持循环', async () => {
    store.playlist = [makeTrack('1', 'u1'), makeTrack('2', 'u2'), makeTrack('3', 'u3')];
    store.currentIndex = 0;
    await store.prev();
    expect(store.currentIndex).toBe(2);
  });

  it('单曲循环模式下 next 保持当前曲目', async () => {
    store.playlist = [makeTrack('1', 'u1'), makeTrack('2', 'u2')];
    store.currentIndex = 0;
    store.setMode(PlayMode.REPEAT_ONE);
    await store.next();
    expect(store.currentIndex).toBe(0);
  });

  it('随机模式下 next 始终在列表范围内', async () => {
    store.playlist = [makeTrack('1', 'u1'), makeTrack('2', 'u2'), makeTrack('3', 'u3')];
    store.currentIndex = 0;
    store.setMode(PlayMode.RANDOM);
    for (let i = 0; i < 20; i++) {
      await store.next();
      expect(store.currentIndex).toBeGreaterThanOrEqual(0);
      expect(store.currentIndex).toBeLessThan(store.playlist.length);
    }
  });

  it('setMode 拒绝非法值', () => {
    store.setMode('不存在的模式' as any);
    expect(store.mode).toBe(PlayMode.SEQUENTIAL);
    store.setMode(PlayMode.RANDOM);
    expect(store.mode).toBe(PlayMode.RANDOM);
  });
});

describe('播放列表操作', () => {
  it('put_in_playlist 插入到当前歌曲之后', () => {
    store.playlist = [makeTrack('A', 'ua'), makeTrack('B', 'ub'), makeTrack('C', 'uc')];
    store.currentIndex = 1;
    store.put_in_playlist(makeTrack('D', 'ud'));

    expect(store.playlist.map((t) => t.id)).toEqual(['A', 'B', 'D', 'C']);
    expect(store.currentIndex).toBe(1);
  });

  it('put_in_playlist 已存在时先移除再插入', () => {
    store.playlist = [makeTrack('A', 'ua'), makeTrack('B', 'ub'), makeTrack('C', 'uc')];
    store.currentIndex = 1;
    store.put_in_playlist(makeTrack('A', 'ua'));

    expect(store.playlist.map((t) => t.id)).toEqual(['B', 'A', 'C']);
    expect(store.currentIndex).toBe(0);
  });

  it('del_from_list 删除后正确调整索引', () => {
    store.playlist = [makeTrack('A', 'ua'), makeTrack('B', 'ub'), makeTrack('C', 'uc')];
    store.currentIndex = 1;

    store.del_from_list('B');
    expect(store.playlist.map((t) => t.id)).toEqual(['A', 'C']);
    expect(store.currentIndex).toBe(1);

    store.del_from_list('A');
    expect(store.currentIndex).toBe(0);

    store.del_from_list('C');
    expect(store.playlist).toEqual([]);
    expect(store.currentIndex).toBe(-1);
    expect(store.audio.src).toBe('');
  });
});

describe('播放控制', () => {
  it('toggle 在已暂停时续播并保留进度', async () => {
    store.playlist = [makeTrack('1', 'u1')];
    await store.playIndex(0);
    store.pause();
    expect(store.audio.paused).toBe(true);

    store.audio.currentTime = 5;
    await store.toggle();
    expect(store.audio.paused).toBe(false);
    expect(store.audio.currentTime).toBe(5);
  });

  it('setCurrentTime 越界时被钳制', () => {
    store.playlist = [makeTrack('1', 'u1')];
    store.currentIndex = 0;
    store.duration = 100;

    store.setCurrentTime(150);
    expect(store.audio.currentTime).toBe(100);
    store.setCurrentTime(-5);
    expect(store.audio.currentTime).toBe(0);
  });
});

describe('player2 兼容层', () => {
  it('setMode 与 state 透传到 Pinia store', () => {
    player2.setMode(PlayMode.RANDOM);
    expect(store.mode).toBe(PlayMode.RANDOM);
    player2.setPlaylist([makeTrack('1', 'u1')]);
    expect(player2.state.playlist.length).toBe(1);
    expect(player2.state.playlist[0].id).toBe('1');
  });
});
