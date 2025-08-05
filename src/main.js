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

const app = createApp(App)
const pinia = createPinia() // Create an instance of Pinia
pinia.use(piniaPluginPersistedstate);

app.config.globalProperties.$axios = axios
app.use(pinia) // Use the Pinia instance
app.use(router).mount('#app')
