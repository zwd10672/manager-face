import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router';
import request from './util/request';
import './assets/style/index.scss'; // 引入全局样式
import './assets/style/reset.css'; // 引入全局样式
const app = createApp(App);
app.config.globalProperties.$request = request
app.use(ElementPlus).use(router).mount('#app')
