import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import IonicVue from '@ionic/vue'
import '@ionic/vue/css/core.css'
import './assets/tailwind.css'

const app = createApp(App)
app.use(router)
app.use(IonicVue)
app.mount('#app')
