import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from "vue-router"
import App from './App.vue'

// const pinia = createPinia()
// const app = createApp(App)

// app.use(pinia)
// app.mount('#app')

import RegisterForm from "./components/users/RegisterForm.vue"
import LoginForm from "./components/users/LoginForm.vue"

const routes = [
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount("#app")