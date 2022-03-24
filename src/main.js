import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import http from './util/request.js'

Vue.prototype.$axios = http

Vue.config.productionTip = false

// 全局混入
Vue.mixin({
  methods: {
    getAutheaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token}`,
      }
    },
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
