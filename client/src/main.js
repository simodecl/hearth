import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import './firebase'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:8000'
}))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
