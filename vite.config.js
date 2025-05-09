import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import https from 'https';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import envCompatible from 'vite-plugin-env-compatible';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
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
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()], // 自动导入 Naive UI 组件
    }),
    vueJsx(),
    viteCommonjs(),
    envCompatible(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'music-2'
        }
      }
    })
  ],
  server: {
    strictPort: false,
    port: 8080,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/kugou': {
        target: 'https://m.kugou.com',
        secure: false,
        changOrigin: true,
        rewrite: (path) => path.replace(/^\/kugou/, '')
      },
      '/mobilecdngz-kugou': {
        target: 'http://mobilecdngz.kugou.com',
        secure: false,
        changOrigin: true,
        rewrite: (path) => path.replace(/^\/mobilecdngz-kugou/, '')
      },
      '/flask': {
        target: 'localhost:5000',
        secure: false,
        changOrigin: true,
        rewrite: (path) => path.replace(/^\/flask/, '')
      },
      '/host': {
        target: 'http://127.0.0.1:5000',
        secure: false,
        changOrigin: true,
        rewrite: (path) => path.replace(/^\/host/, '')
      },
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
  build: {}
})
