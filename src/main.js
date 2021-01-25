// 1
import store from './store'
import { auth } from './firebase'

import 'tachyons'
import Vue from 'vue'
// 2

import App from './App'
import router from './router'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
/* eslint-disable */
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
