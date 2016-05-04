import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import Main from './components/Main'
import Blogs from './components/Blogs'
import ModalTest from './components/ModalTest'

Vue.use(VueRouter)

var router = new VueRouter({
  history: false
})

router.map({
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  '/hello': {
    component: Hello
  },
  '/admin': {
    component: Admin
  },
  '/': {
    component: Main
  },
  '/blogs': {
    component: Blogs
  },
  '/test': {
    component: ModalTest
  }
})

export default router
