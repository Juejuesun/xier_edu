import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

import './assets/global.css'
// import 'font-awesome/css/font-awesome.css'

axios.defaults.baseURL = 'http://47.96.231.121'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
