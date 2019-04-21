import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Join from './views/Join.vue'
import Room from './views/Room.vue'
import AppHome from './views/AppHome.vue'
import AppYoutube from './views/AppYoutube.vue'
import AppSpotify from './views/AppSpotify.vue'
import YoutubeSearch from './views/YoutubeSearch.vue'
import YoutubePlaylist from './views/YoutubePlaylist.vue'
import YoutubeHistory from './views/YoutubeHistory.vue'
import YoutubeFavourites from './views/YoutubeFavourites.vue'
import SpotifySearch from './views/SpotifySearch.vue'
import SpotifyPlaylist from './views/SpotifyPlaylist.vue'
import SpotifyHistory from './views/SpotifyHistory.vue'
import SpotifyFavourites from './views/SpotifyFavourites.vue'

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
		component: AppYoutube,
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
			},
			{
				path: 'favourites',
				meta: { layout: "navbars" },
				component: YoutubeFavourites
			}
		]
	},
	{
		path: "/app/room/:roomid/spotify",
		name: "AppSpotify",
		meta: { layout: "navbars" },
		component: AppSpotify,
		children: [
			{
				path: '',
				meta: { layout: "navbars" },
				component: SpotifySearch
			},
			{
				path: 'playlist',
				meta: { layout: "navbars" },
				component: SpotifyPlaylist
			},
			{
				path: 'history',
				meta: { layout: "navbars" },
				component: SpotifyHistory
			},
			{
				path: 'favourites',
				meta: { layout: "navbars" },
				component: SpotifyFavourites
			}
		]
	}
  ]
})
