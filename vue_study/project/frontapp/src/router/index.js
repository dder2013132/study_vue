import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import NestedComponent from '@/views/NestedComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/boardL',
      name: 'boardL',
      component: () => import('../views/BoardList.vue'),
    },
    {
      path: '/boardF',
      name: 'boardF',
      component: () => import('../views/BoardForm.vue'),
    },
    {
      path: '/boardI',
      name: 'boardI',
      component: () => import('../views/BoardInfo.vue'),
    },
  ],
})

export default router