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
                { title: 'Search', icon: 'search', link: 'youtube/' },
                { title: 'Playlist', icon: 'playlist_play', link: 'youtube/playlist' },
                { title: 'History', icon: 'history', link: 'youtube/history' },
                { title: 'Favourites', icon: 'star', link: 'youtube/favourites' },
            ]
        }
    }
}
</script>