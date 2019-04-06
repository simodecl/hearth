<template>
    <div>
        <a href="/api/v1/spotify/login?room=6409" class="btn btn-login">Login with Spotify</a>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        this.setNav()
    },
    methods: {
        setNav() {
            this.$parent.$parent.items = [
                { title: 'Search', icon: 'search', link: 'spotify/' },
                { title: 'Playlist', icon: 'playlist_play', link: 'spotify/playlist' },
                { title: 'History', icon: 'history', link: 'spotify/history' },
                { title: 'Favourites', icon: 'star', link: 'spotify/favourites' },
            ]
        },
        login(){
            axios.get('/api/v1/spotify/login').then((token) => {
                console.log(token)
            })
        },
    }
}
</script>
