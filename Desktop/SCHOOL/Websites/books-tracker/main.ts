import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)