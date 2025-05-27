import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { faqPlugin } from './store/faq'

const app = createApp(App)
app.use(router)
app.use(faqPlugin)
app.mount('#app')
