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
      path: '/bookform/:id',
      name: 'bookform_edit',
      component: () => import('../views/BookForm.vue'),
    },
    {
      path: '/bookform',
      name: 'bookform_new',
      component: () => import('../views/BookForm.vue'),
    },
    {
      path: '/bookinfo/:id',
      name: 'bookinfo',
      component: () => import('../views/BookInfo.vue'),
    },
  ],
})

export default router