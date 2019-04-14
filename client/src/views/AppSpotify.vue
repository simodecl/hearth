<template>
    <div>
        <router-view v-if="accessToken"></router-view>
        <a v-else v-bind:href="`/api/v1/spotify/login?room=${this.$route.params.roomid}`" class="btn btn-login">Login with Spotify</a>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        this.setNav()
        this.setToken()
        console.log(this.accessToken)
    },
    computed: {
        accessToken() {
            return this.$store.getters['accessToken']
        }
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
        setToken() {
            if (this.$route.query && !this.accessToken ) {
                this.$store.dispatch('SET_TOKENS', this.$route.query)
            }
        }
    }
}
</script>
