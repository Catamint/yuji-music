// player2.ts - 兼容层
// 旧的模块级单例已迁入 Pinia（见 playerStore.ts）。
// 本文件仅保留旧调用入口，供尚未迁移的页面/组件使用。
// 新代码应直接使用 usePlayerStore()。
import { usePlayerStore, PlayMode } from './playerStore';
import type { PlayModeValue } from './playerStore';
import type { Music } from '@/model';

const player2 = {
  get state() {
    return usePlayerStore().$state;
  },
  initAudio: () => usePlayerStore().initAudio(),
  destroy: () => usePlayerStore().destroy(),
  setPlaylist: (playlist: Music[]) => usePlayerStore().setPlaylist(playlist),
  setSrc: (url: string) => usePlayerStore().setSrc(url),
  setCurrentTime: (time: number) => usePlayerStore().setCurrentTime(time),
  setMode: (mode: PlayModeValue) => usePlayerStore().setMode(mode),
  playIndex: (index?: number) => usePlayerStore().playIndex(index),
  play: (music: Music) => usePlayerStore().play(music),
  playMulti: (songs: Music[] | null, index?: number) => usePlayerStore().playMulti(songs, index),
  play_in_playlist: (id: string) => usePlayerStore().play_in_playlist(id),
  pause: () => usePlayerStore().pause(),
  toggle: () => usePlayerStore().toggle(),
  next: () => usePlayerStore().next(),
  prev: () => usePlayerStore().prev(),
  put_in_playlist: (song: Music) => usePlayerStore().put_in_playlist(song),
  del_from_list: (id: string) => usePlayerStore().del_from_list(id),
};

export { PlayMode };
export default player2;
