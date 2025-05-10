import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
// import naive from 'naive-ui/es/preset'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia() // Create an instance of Pinia
app.config.globalProperties.$axios = axios
// app.use(naive)
app.use(pinia) // Use the Pinia instance
app.use(router).mount('#app')
