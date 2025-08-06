import { registerPlugin } from '@capacitor/core';

export interface CookiePlugin {
  getCookies(options: { url: string }): Promise<{ cookies: string }>;
}

const CookiePlugin = registerPlugin<CookiePlugin>('CookiePlugin');

export default CookiePlugin;
