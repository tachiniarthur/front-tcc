import './assets/main.css';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from './fontawesome.js';
import { useAuthStore } from '@/stores/auth'
import App from './App.vue'
import router from './router';

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

const pinia = createPinia()
app.use(pinia)
app.use(router)

const auth = useAuthStore()
auth.checkAuth()

app.mount('#app')
