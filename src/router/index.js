import Vue from 'vue'
import Router from 'vue-router'

// 1
import CreateLink from '../components/CreateLink'
import LinkList from '../components/LinkList'
import AppLogin from '../components/AppLogin'
import { auth } from '../firebase'
import Search from '../components/Search'
Vue.use(Router)
/* eslint-disable */
const routes = [
  {
    path: '/',
    component: LinkList
  },
  {
    path: '/create',
    component: CreateLink,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: AppLogin
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
