import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import https from 'https';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import envCompatible from 'vite-plugin-env-compatible';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const target = env.VITE_BUILD_TARGET || 'dev';
  console.log('target', target);
  let base = '/';
  let plugins = [
    vue(),
    vueJsx(),
    tailwindcss(),
    viteCommonjs(),
    envCompatible(),
    // basicSsl(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'music-2'
        }
      }
    }),
    {
      name: 'copy-404',
      closeBundle() {
        fs.copyFileSync('dist/index.html', 'dist/404.html')
      }
    },
    Components(),
  ];

  if ( target === 'capacitor' ) {
    base = './';
  } else if ( target === 'dev' ) {
    base = '/';
      plugins.push(
      VitePWA({
        base:  '/',
        registerType: 'autoUpdate',
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        devOptions: {
          enabled: true // 方便开发调试
        },
        manifest: {
          name: '雨霁音乐',
          short_name: '雨霁音乐',
          description: '就一个听歌的应用',
          theme_color: '#f6889f',
          start_url: '/',
          display: 'standalone',
          icons: [
            {
              // src: '/yuji-music/icon/icon-192.png',
              src: '/icon/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              // src: '/yuji-music/icon/icon-512.png',
              src: '/icon/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    );
  } else if (target === 'pwa') {
    base = env.VITE_APP_BASE || '/';
    plugins.push(
      VitePWA({
        base: base || '/',
        registerType: 'autoUpdate',
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,png,svg,ico}']
        },
        // devOptions: {
        //   enabled: true // 方便开发调试
        // },
        manifest: {
          name: '雨霁音乐',
          short_name: '雨霁音乐',
          description: '就一个听歌的应用',
          theme_color: '#f6889f',
          start_url: base || '/',
          display: 'standalone',
          icons: [
            {
              src: '/yuji-music/icon/icon-192.png',
              // src: '/icon/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/yuji-music/icon/icon-512.png',
              // src: '/icon/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    );
  }
  
  return {
    base,
    plugins,
    publicDir: 'public',
    resolve: {
      alias: [
        {
        find: 'my-cookie-manager',
        replacement: path.resolve(__dirname, './my-cookie-manager'),
        },
        {
          find: /^~/,
          replacement: ''
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ],
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    server: {
      strictPort: false,
      port: 8090,
      host: '0.0.0.0',
      allowedHosts: [
        'xmiaoing.iask.in'
        // 如果你还需要允许其他主机，可以在这里继续添加
      ],
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          secure: false,
          changOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
            });
          }
        },
        '/gdstudio': {
          target: 'https://music-api.gdstudio.xyz',
          secure: false,
          changOrigin: false,
          rewrite: (path) => path.replace(/^\/gdstudio/, '/api.php'),
          // agent: new https.Agent({
          //   rejectUnauthorized: false, // 忽略自签名证 书验证
          // }),  
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
            });
          }
        }
      }
    },
  }
})
