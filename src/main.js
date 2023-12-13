import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import './assets/global.css';
import router from './routes/router.js'
import store from './store/index.js'

createApp(App).use(router).use(store).mount('#app')
