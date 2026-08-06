import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '@/services/api.js';

vi.mock('@/services/request.js', () => ({
  default: vi.fn(async () => ({ code: 200 })),
}));

import request from '@/services/request.js';

beforeEach(() => {
  vi.mocked(request).mockClear();
});

describe('api.js 接口修复', () => {
  it('getArtistDetail 调用 request 而非不存在的 api.request', async () => {
    await api.getArtistDetail(123);
    expect(request).toHaveBeenCalledWith('/artist/detail?id=123');
  });

  it('getUserSubcount 不再引用未定义的 params', async () => {
    await expect(api.getUserSubcount()).resolves.toEqual({ code: 200 });
    expect(request).toHaveBeenCalledWith('/user/subcount?');
  });

  it('getPlaylistAllTracks 只保留一份实现, 默认 limit=1000', async () => {
    await api.getPlaylistAllTracks('10001');
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith('/playlist/track/all?id=10001&limit=1000&offset=0');
  });
});
