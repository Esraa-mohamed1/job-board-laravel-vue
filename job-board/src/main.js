import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import ar from './locales/ar.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ar }
  })
  


const pinia = createPinia()
const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')
