import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // {
      // path: '/board',
      // name: 'board',
      // component: () => import('../views/BoardList.vue'),
    // },
    // {
    //   path: '/boardInfo',
    //   name: 'boardInfo',
    //   component: () => import('../views/BoardInfo.vue'),
    // },
    {
      path: '/nested',
      name: 'nested',
      component: () => import('../views/NestedComponent.vue'),
    },
    {
      path: '/component',
      name: 'component',
      component: () => import('../views/ComponentView.vue'),
    },
    {
      path: '/provide',
      name: 'provide',
      component: () => import('../views/ProvideInject.vue'),
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('../views/WatchView.vue'),
    },
    {
      path: '/sv',
      name: 'sv',
      component: () => import('../views/StoreView.vue'),
    }
]})

export default router
