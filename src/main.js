import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { createPinia } from 'pinia'
import "@/index.css"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './main.css'

const app = createApp(App)
const pinia = createPinia() // Create an instance of Pinia
pinia.use(piniaPluginPersistedstate);

app.config.globalProperties.$axios = axios
app.use(pinia) // Use the Pinia instance
app.use(router).mount('#app')

// main.js
if ('serviceWorker' in navigator ) {
  // 只在浏览器环境中注册 Service Worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('Service Worker registered:', registration.scope);
    }).catch(error => {
      console.error('Service Worker registration failed:', error);
    });
  });
}