import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/loginView.vue'
import forgetPassword from '../views/forgetPassword.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/',
    name:'forgetPassword',
    component:forgetPassword
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;


