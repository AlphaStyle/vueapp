import App from './App'
import router from './route.js'
import store from './vuex/store' // vuex store instance
import { sync } from 'vuex-router-sync'

sync(store, router)

router.start(App, 'app')
