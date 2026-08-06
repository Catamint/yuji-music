import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

describe('Service Worker 单一注册入口', () => {
  it('main.js 不再手动注册 Service Worker', () => {
    const main = readFileSync(new URL('./main.js', import.meta.url), 'utf-8');
    expect(main).not.toContain('registerServiceWorker');
    expect(main).not.toContain('serviceWorker.register');
    expect(main).not.toContain('/sw.js');
  });

  it('注册入口文件 registerServiceWorker.js 已删除', () => {
    expect(() => readFileSync(new URL('./registerServiceWorker.js', import.meta.url), 'utf-8')).toThrow();
  });
});
