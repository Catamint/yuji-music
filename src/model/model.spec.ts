import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Music, Album, SongList, EntityStore } from '@/model';
import songService from '@/services/songService';

vi.mock('@/services/songService', () => ({
  default: {
    getAlbumPicUrl: vi.fn(async () => 'https://pic.example/album.jpg'),
    getSonglistContent: vi.fn(async () => []),
    getAlbum: vi.fn(async () => {
      const { Album } = await import('@/model');
      return Album.fromRaw({ id: '9', name: '专辑', artist: { id: '1', name: '艺人' } });
    }),
  },
}));

beforeEach(() => {
  EntityStore.clearAll();
  vi.clearAllMocks();
});

describe('model ↔ songService 循环依赖', () => {
  it('model 桶与 songService 可同时导入, 不抛错', () => {
    expect(typeof Music.fromRaw).toBe('function');
    expect(typeof Album.fromRaw).toBe('function');
    expect(typeof SongList.fromRaw).toBe('function');
    expect(typeof songService.getAlbum).toBe('function');
  });

  it('Music.updatePicUrl 懒加载 songService 获取封面', async () => {
    const music = Music.fromRaw({ id: '1', name: 'Song', al: { id: 'a1', name: 'Album' }, ar: [{ id: 'a', name: 'Artist' }] });
    const url = await music.updatePicUrl(300);
    expect(songService.getAlbumPicUrl).toHaveBeenCalledWith('a1', 300);
    expect(url).toBe('https://pic.example/album.jpg?param=300y300');
  });

  it('SongList.updateMusics 懒加载 songService 获取歌曲', async () => {
    const list = SongList.fromRaw({ id: 'pl1', name: 'Playlist' });
    const musics = Music.fromRawArray([{ id: '1', name: 's1' }, { id: '2', name: 's2' }]);
    vi.mocked(songService.getSonglistContent).mockResolvedValue(musics);

    await list.updateMusics();
    expect(songService.getSonglistContent).toHaveBeenCalledWith('pl1');
    expect(list.getMusics()?.map((m) => m.id)).toEqual(['1', '2']);
  });

  it('Album.get 懒加载 songService, 二次调用走 EntityStore 缓存', async () => {
    const album = await Album.get('9');
    expect(album).toBeInstanceOf(Album);
    expect(album?.name).toBe('专辑');
    expect(songService.getAlbum).toHaveBeenCalledTimes(1);

    await Album.get('9');
    expect(songService.getAlbum).toHaveBeenCalledTimes(1);
  });
});

describe('Music 字段映射', () => {
  it('fromRaw 正确映射 id/名称/时长/艺人/专辑', () => {
    const m = Music.fromRaw({
      id: '42', name: '晴天',
      al: { id: 'al1', name: '叶惠美' },
      ar: [{ id: 'r1', name: '周杰伦' }],
      dt: 269000,
    }, 'search');
    expect(m.id).toBe('42');
    expect(m.name).toBe('晴天');
    expect(m.duration).toBe('4:29');
    expect(m.getArtistInfo()?.name).toBe('周杰伦');
    expect(m.albumInfo.name).toBe('叶惠美');
  });
});
