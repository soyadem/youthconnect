import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import AboutUs from '../views/auth/AboutUs.vue'
import CreateCategory from '../views/activities/CreateCategory'
import CategoryDetails from '../views/activities/CategoryDetails'
import UserActivities from '../views/activities/UserActivities'

import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}
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
    path: '/categories/create',
    name: 'CreateCategory',
    component: CreateCategory,
    beforeEnter: requireAuth
  },
  {
    path: '/categories/:id',
    name: 'CategoryDetails',
    component: CategoryDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/activities/user',
    name: 'UserActivities',
    component: UserActivities,
    beforeEnter: requireAuth
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
