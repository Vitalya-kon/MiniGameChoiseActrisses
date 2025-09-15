import '@/assets/style.css'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.$router = markRaw(router)
    store.$route = markRaw(router.currentRoute.value)
})
app.use(pinia)

app.use(router)
app.mount('#app')