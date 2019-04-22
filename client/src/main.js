import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import VueYoutube from 'vue-youtube'
import './firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Default from './layouts/Default.vue'
import Navbars from './layouts/Navbars.vue'
import interceptorSetup from './interceptors'

Vue.component('default-layout', Default);
Vue.component('navbars-layout', Navbars);

Vue.config.productionTip = false

Vue.use(Vuetify, {
  icons: {
    'youtube': 'fab fa-youtube',
    'spotify': 'fab fa-spotify',
    'github': 'fab fa-github'
  }
})
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:8000'
}))
Vue.use(VueYoutube)
const int = interceptorSetup()
new Vue({
  int,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
