<template>
    <div>
        <router-view v-if="accessToken"></router-view>
        <div v-else class="btn-container">
            <a v-bind:href="`/api/v1/spotify/login?room=${this.$route.params.roomid}`" class="btn btn-login"><v-icon>$vuetify.icons.spotify</v-icon> Login with Spotify</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created() {
        this.setNav()
        setTimeout(this.setToken(), 1000)
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
            axios.get('/api/v1/spotify/login')
        },
        setToken() {
            if (this.$route.query.access_token && !this.accessToken ) {
                this.$store.dispatch('SET_TOKENS', this.$route.query)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-container {
    display: block;
    margin: 50px auto;
    width: 200px;
}

.btn-login {
    display: block;
    margin: 0 auto;
    padding: 10px;
    background-color: #1ED760;
    color: white;
    text-decoration: none;
    text-align: center;
}

.btn-login .v-icon {
    color: white !important;
    font-size: 1.5rem;
}
</style>

