import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AddPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import Profile from '../views/Profile.vue'
import Forgot from '../views/Forgot.vue'
import Reset from '../views/Reset.vue'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    redirect:'/login',
           
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
   
           
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
   
           
  },
  {
    path: '/LandingPage',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/dashboard/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  
  },
  {
    path: '/dashboard/add-post',
    name: 'add-post',
    component: AddPost,
  },
  {
    path: '/dashboard/post/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/dashboard/edit-post/:id',
    name: 'edit-post',
    component: EditPost,
  },
  {
    path: '/reset-password/:id/:token',
    name: 'reset-password',
    component: Reset,
  },
  {
    path: '/dashboard/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/dashboard/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
