import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'entrance',
  //   component: () => import('../views/EntranceView.vue')
  // },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
