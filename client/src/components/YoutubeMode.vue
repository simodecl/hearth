<template>
    <div class="main-yt">
        <youtube v-if="video" class="video-yt" width="100%" height="100%" :video-id="video" :player-vars="playerVars" ref="youtube" v-on:ended="playNext" @playing="playing"></youtube>
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
        }
    },
    methods: {
        play(videoId) {
            this.video = videoId
            this.player.playVideo
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
        },
    },
    sockets: {
        playVideo(videoId) {
            this.play(videoId)
        }
    },
}
</script>

<style lang="scss">

.main-yt {
    width: 100%;
    height: 100%;
}

</style>


