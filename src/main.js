import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
// import naive from 'naive-ui/es/preset'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.config.globalProperties.$axios = axios
// app.use(naive)
app.use(router).mount('#app')
