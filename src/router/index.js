
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './../components/home.vue';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎体验vue3全栈技术'
        },
        component: () => import('../views/welcome.vue'),
      },
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/user.vue')
      },
      {
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/menu.vue')
      },
      {
        name: 'test',
        path: '/test',
        meta: {
          title: '测试管理'
        },
        component: () => import('../views/test.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录页'
    },
    component: () => import('../views/login.vue'),
  },
  // {
  //   name: 'test',
  //   path: '/test',
  //   meta: {
  //     title: '测试管理'
  //   },
  //   component: () => import('../views/test.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router