import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import AboutUs from '../views/auth/AboutUs.vue'
import CreateActivity from '../views/activities/CreateActivity'
import MyActivities from '../views/auth/MyActivities.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/create',
    name: 'CreateActivity',
    component: CreateActivity
  },
  {
    path: '/myactivities',
    name: 'MyActivities',
    component: MyActivities
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
