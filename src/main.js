import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

// styles
import './assets/main.css'

const pinia = createPinia()

let app
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(pinia)  // 🔥 Tilføj Pinia her
            .use(router)
            .mount('#app')
    }
})
