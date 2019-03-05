import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AppHome from './views/AppHome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL || 'localhost:8080',
  routes: [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/app',
		name: 'AppHome',
		component: AppHome
	}
  ]
})
