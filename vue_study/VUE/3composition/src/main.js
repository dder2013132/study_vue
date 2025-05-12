import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia();
app.use(router)
app.use(store)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
