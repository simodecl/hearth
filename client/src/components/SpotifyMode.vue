<template>
    <div>
        <div class="progress-bar">
            <div ref="progress" class="progress"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            device: ''
        }
    },
    mounted () {
        this.initiatePlayer()
    },
    computed: {
        token() {
            return this.$store.getters['accessToken']
        }
    },
    methods: {
        play(song) {
            const data = {
                uris: [song.uri]
            }
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, data)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
            this.startProgressBar(song.duration_ms)
        },
        startProgressBar(duration) {
            const progress = this.$refs.progress
            let width
            width = 0
            console.log(duration)
            const updateProgress = () => {
                if (width >= 1000) {
                clearInterval(interval)
                } else {
                width++
                progress.style.width = width/10 + '%'
                }
            }
            const interval = setInterval(updateProgress, duration/1000)
        },
        waitForSpotifyWebPlaybackSDKToLoad: async function () {
            return new Promise(resolve => {
                if (window.Spotify) {
                    resolve(window.Spotify)
                } else {
                    window.onSpotifyWebPlaybackSDKReady = () => {
                        resolve(window.Spotify)
                    }
                }
            })
        },
        initiatePlayer: async function () {
            const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad()
            const sdk = new Player({
                name: `Hearth: Room ${this.$route.params.roomid}`,
                volume: 0.25,
                getOAuthToken: callback => { callback(this.token) }
            })
            console.log(JSON.stringify(sdk))
            // Error handling
            sdk.addListener('initialization_error', ({ message }) => { console.log('Initialization_error: ' + message) })
            sdk.addListener('authentication_error', ({ message }) => { console.log('Authentication_error: ' + message) })
            sdk.addListener('account_error', ({ message }) => { console.log('Account_error: ' + message) })
            sdk.addListener('playback_error', ({ message }) => { console.log('Playback_error: ' + message) })
            // Playback status updates
            sdk.addListener('player_state_changed', state => {
                // Update UI information on player state changed
                console.log(state)
            })
            // Ready
            sdk.addListener('ready', ({ device_id }) => {
                this.device = device_id
                console.log('Ready with Device Id: ', device_id)
            })
            // Not Ready
            sdk.addListener('not_ready', ({ device_id }) => {
                console.log('Not ready with device Id: ', device_id)
            })
            sdk.connect()
        }
    },
    sockets: {
        playSong(song) {
            this.play(song)
        }
    },
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  background-color: $lightgrey;
}

.progress {
  width: 1%;
  height: 10px;
  background-color: $lightred;
}
</style>

