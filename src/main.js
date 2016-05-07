/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routers from './route.js'
import store from './vuex/store' // vuex store instance
import { sync } from 'vuex-router-sync'
import VueValidator from 'vue-validator'
import vueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(vueResource)

Vue.validator('email', function (val) {
  return /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
})

const router = new VueRouter()
router.map(routers)
router.start(App, 'app')

sync(store, router)
