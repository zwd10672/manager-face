import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons-vue';
import App from './App.vue'
import router from './router';
import request from './util/request';
import store from './store';
import './assets/style/index.scss'; // 引入全局样式
import './assets/style/reset.css'; // 引入全局样式

console.log(import.meta.env);
const app = createApp(App);
app.config.globalProperties.$request = request
app.use(ElementPlus).use(store).use(router).mount('#app')
// 注册所有图标组件
for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}
