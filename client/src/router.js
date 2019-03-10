import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Join from './views/Join.vue'
import Room from './views/Room.vue'
import AppHome from './views/AppHome.vue'
import AppRoom from './views/AppRoom.vue'

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
		path: '/join',
		name: 'join',
		component: Join
	},
	{
		path: '/room/:roomid',
		name: 'room',
		component: Room
	},
	{
		path: '/app',
		name: 'apphome',
		component: AppHome
	},
	{
		path: '/app/room/:roomid',
		name: 'approom',
		component: AppRoom
	},
  ]
})
