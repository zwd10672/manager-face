import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import request from './util/request';
const app = createApp(App);
app.config.globalProperties.$request = request
app.use(ElementPlus).use(router).mount('#app')
