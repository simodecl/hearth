import Vue from 'vue'
import Router from 'vue-router'
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
  routes: [
	{
		path: '',
		name: 'apphome',
		component: AppHome
	},
	{
		path: "/room/:roomid/youtube",
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
		path: "/room/:roomid/spotify",
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
