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
      path: '/booklist',
      name: 'booklist',
      component: () => import('../views/BookList.vue'),
    },
    {
      path: '/bookdetail/:id',
      name: 'bookdetail',
      component: () => import('../views/BookDetail.vue'),
    },
    {
      path: '/bookadd',
      name: 'bookadd',
      component: () => import('../views/BookForm.vue'),
    },
    {
      path: '/bookupdate/:id',
      name: 'bookupdate',
      component: () => import('../views/BookForm.vue'),
    },
  ],
})

export default router