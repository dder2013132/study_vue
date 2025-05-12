import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '@/views/MainComponent.vue'
import BoardView from '@/views/BoardView.vue'
import BoardInfo from '@/views/BoardInfo.vue'
import BoardForm from '@/views/BoardForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainComponent
  },
  {
    path: '/boardlist',
    name: 'boardlist',
    component: BoardView
  },
  {
    path: '/boardinfo/:no',
    name: 'boardinfo',
    component: BoardInfo
  },
  {
    path: '/boardform/:no',
    name: 'boardform',
    component: BoardForm
  },
  {
    path: '/boardform/new',
    name: 'boardformnew',
    component: BoardForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
