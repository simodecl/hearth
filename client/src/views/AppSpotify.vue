<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
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
        }
    }
}
</script>
