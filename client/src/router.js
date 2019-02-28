import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomeView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL || 'localhost:8080',
  routes: [
	{
		path: '/',
		name: 'home',
		component: Home
	}
  ]
})
