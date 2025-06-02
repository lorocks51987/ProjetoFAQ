import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { faqPlugin } from './store/faq'

const app = createApp(App)

// Configurar plugins
app.use(router)
app.use(faqPlugin)

// Montar a aplicação após garantir que o DOM está pronto
window.addEventListener('load', () => {
    app.mount('#app')
})
