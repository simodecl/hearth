<template>
    <div class="main-yt">
        <youtube class="video-yt" width="100%" height="100%" :video-id="video" :player-vars="playerVars" ref="youtube" v-on:ended="playNext" @playing="playing"></youtube>
    </div>
</template>

<script>
export default {
    data() {
        return {
            video: null,
            playerVars: {
                autoplay: 1
            }
        }
    },
    created() {
    },
    computed: {
        player () {
            return this.$refs.youtube.player
        },
        playlist () {
            return this.$store.getters['playlist']
        },
        currentVideo() {
            return this.$store.getters['currentVideo']
        },
    },
    methods: {
        play(videoId) {
            this.$store.dispatch('VIDEO_PLAYING', true)
            this.video = videoId
            this.player.playVideo()
        },
        playing() {
            clearInterval(this.progressBroadcaster)
            this.player.getDuration().then((duration) => {
                this.$socket.emit('videoInfo', duration)
            })
            this.progressBroadcaster = setInterval(() => {
                this.player.getCurrentTime().then((progress) => {
                    this.$socket.emit('videoProgress', progress)
                })
            }, 1000)
        },
        playNext(){
            this.$store.dispatch('PLAY_NEXT_VIDEO')
        },
    },
    sockets: {
        playVideo(videoId) {
            this.play(videoId)
        },
        pauseVideo() {
            this.$store.dispatch('VIDEO_PLAYING', false)
            this.player.pauseVideo()
        }
    },
}
</script>

<style lang="scss">

.main-yt {
    width: 100vw;
    height: 100vh;
}

</style>


