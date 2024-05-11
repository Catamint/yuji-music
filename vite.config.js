import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import envCompatible from 'vite-plugin-env-compatible';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

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
      }
    }
  },
  build: {}
})
