import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Join from './views/Join.vue'
import Room from './views/Room.vue'
import AppHome from './views/AppHome.vue'
import YoutubeSearch from './views/YoutubeSearch.vue'
import YoutubePlaylist from './views/YoutubePlaylist.vue'
import YoutubeHistory from './views/YoutubeHistory.vue'

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
		path: "/app/room/:roomid/youtube",
		name: "AppYoutube",
		meta: { layout: "navbars" },
		component: require("./views/AppYoutube.vue").default,
		children: [
			{
				path: '',
				meta: { layout: "navbars" },
				component: YoutubeSearch
			},
			{
				path: 'playlist',
				meta: { layout: "navbars" },
				component: YoutubePlaylist
			},
			{
				path: 'history',
				meta: { layout: "navbars" },
				component: YoutubeHistory
			}
		]
	},
	{
		path: "/app/room/:roomid/spotify",
		name: "AppSpotify",
		meta: { layout: "navbars" },
		component: require("./views/AppSpotify.vue").default
	},
	{
		path: "/app/room/:roomid/images",
		name: "AppImages",
		meta: { layout: "navbars" },
		component: require("./views/AppImages.vue").default
	},
  ]
})
