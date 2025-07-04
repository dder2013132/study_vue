// import { createMemoryHistory, createRouter } from 'vue-router'

// import GoodsView from '../components/goods.vue';
// import MemberForm from '../views/MemberForm.vue';
// import EmpForm from '@/views/EmpForm.vue';
// import MovieForm from '@/views/MovieForm.vue';
// import TodoForm from '@/views/TodoForm.vue';
// import ParamView from '@/views/ParamView.vue';

// const routes = [
//   { path: '/', component: GoodsView},
//   { path: '/memberForm', component: MemberForm },
//   { path: '/empForm', component: EmpForm },
//   { path: '/movieForm', component: MovieForm },
//   { path: '/todoForm', component: TodoForm },
//   { path: '/paramView/:username', component: ParamView },
// ]

// const router = createRouter({
//   history: createMemoryHistory(),
//   routes,
// })

// export default router;

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
      path: '/nested',
      name: 'nested',
      component: () => import('../views/NestedComponent.vue'),
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import('../views/ParentComponent.vue'),
    },
    {
      path: '/parent4',
      name: 'parent4',
      component: () => import('../views/ParentComponent4.vue'),
    },
    {
      path: '/emp',
      name: 'emp',
      component: () => import('../views/EmpComponent.vue'),
    },
    {
      path: '/empview',
      name: 'empview',
      component: () => import('../views/EmpView.vue'),
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('../views/SlotView.vue'),
    },
    {
      path: '/provide',
      name: 'provide',
      component: () => import('../views/ProjectInject.vue'),
    },
  ],
})

export default router
