
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './../components/home.vue';
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
        component: () => import('../views/welcome.vue'),
      },
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router