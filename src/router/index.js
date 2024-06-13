
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './../components/HelloWorld.vue';
import Welcome from './../components/welcome.vue';
import Login from './../components/login.vue';
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: Welcome,
      },
      {
        name: 'login',
        path: '/login',
        component: Login,
      },

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router