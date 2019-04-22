<template>
    <div v-show="active === 'spotify'" class="main">
        <div class="background" v-if="current">
            <div class="background-thumbnail" v-bind:style="{ 'background-image': `url(${current.album.images[0].url})` }" />
            <div class="background-gradient"/>
        </div>
        <div class="room">
            <div class="room-code">{{ this.$route.params.roomid }}</div>
            <img class="logo-img" src="/assets/hearth_logo_multicolor.png" />
        </div>
        <div v-if="current" class="current-container">
            <img class="current-thumbnail" :src="current.album.images[1].url" />
            <div class="current-info">
                <div class="current-text">
                    <div class="current-name">{{ current.name }}</div>
                    <div class="current-artist">{{ current.artists[0].name }}</div>
                </div>
                <div class="progress-bar">
                    <div ref="progress" class="progress"></div>
                </div>
            </div>
        </div>
        <div class="playlist-container">
            <div class="playlist-item" v-for="(song,index) in playlist.slice(0, 6)" v-bind:key="index">
                <img class="song-thumbnail" :src="song.album.images[1].url" />
                <div class="song-info">
                    <div class="song-name">{{ song.name }}</div>
                    <div class="song-artist">{{ song.artists[0].name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            device: '',
            playstate: null,
            interval: null,
        }
    },
    mounted () {
        this.initiatePlayer()
    },
    computed: {
        token() {
            return this.$store.getters['accessToken']
        },
        active() {
            return this.$store.getters['active']
        },
        current() {
            return this.$store.getters['currentSong']
        },
        playlist() {
            return this.$store.getters['spotifyPlaylist']
        }
    },
    methods: {
        play(data) {
            console.log('Playing song')
            this.$store.dispatch('SONG_PLAYING', true)
            const body = {
                uris: [data.song.uri],
                position_ms: this.playstate ? this.playstate.position : 0
            }
            if (data.next) {
                body.position_ms = 0
            }
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, body)

            if (this.interval) {
                clearInterval(this.interval)
                this.interval = null
            }
            if (this.playstate && this.playstate.track_window.current_track.uri === data.song.uri) {
                this.startProgressBar(this.playstate.position, data.song.duration_ms)
            } else {
                this.startProgressBar(0, data.song.duration_ms)
            }
        },
        startProgressBar(position, duration) {
            const progress = this.$refs.progress
            let width
            width = position/duration*1000
            const updateProgress = () => {
                if (width >= 1000) {
                clearInterval(this.interval)
                } else {
                width++
                progress.style.width = width/10 + '%'
                }
            }
            this.interval = setInterval(updateProgress, (duration-position)/1000)
        },
        waitForSpotifyWebPlaybackSDKToLoad: async function () {
            return new Promise(resolve => {
                this.$nextTick(() => {
                if (window.Spotify) {
                    resolve(window.Spotify)
                } else {
                    window.onSpotifyWebPlaybackSDKReady = () => {
                        resolve(window.Spotify)
                    }
                }
                })
                
            })
        },
        initiatePlayer: async function () {
            const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad()
            const sdk = new Player({
                name: `Hearth: Room ${this.$route.params.roomid}`,
                volume: 0.25,
                getOAuthToken: callback => { callback(this.token) }
            })
            // Error handling
            sdk.addListener('initialization_error', ({ message }) => { console.log('Initialization_error: ' + message) })
            sdk.addListener('authentication_error', ({ message }) => { console.log('Authentication_error: ' + message) })
            sdk.addListener('account_error', ({ message }) => { console.log('Account_error: ' + message) })
            sdk.addListener('playback_error', ({ message }) => { console.log('Playback_error: ' + message) })
            // Playback status updates
            sdk.addListener('player_state_changed', state => {
                // Update UI information on player state changed
                this.playstate = state
                if (state.paused) {
                    clearInterval(this.interval)
                    this.interval = null
                    this.$store.dispatch('SONG_PLAYING', false)
                } else {
                    this.$store.dispatch('SONG_PLAYING', true)
                    !this.interval ? this.startProgressBar(state.position, state.duration) : ''
                }
                if(state.paused && state.position === 0 && state.restrictions.disallow_resuming_reasons &&
                    state.restrictions.disallow_resuming_reasons[0] === 'not_paused'){
                    this.$store.dispatch('PLAY_NEXT_SONG')
                }
            })
            // Ready
            sdk.addListener('ready', ({ device_id }) => {
                this.device = device_id
                this.$store.dispatch('SET_DEVICE', device_id)
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
        playSong(song, next) {
            this.play(song, next)
        },
        pauseSong() {
            axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${this.device}`)
        }
    },
}
</script>

<style lang="scss" scoped>

.main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.background {
    position: absolute;
    min-height: 100vh;
    width: 100vw;
    z-index: 1;
}

.background-thumbnail {
    min-height: 100vh;
    min-width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.15;
}

.background-gradient {
    position:fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    background-image: linear-gradient(transparent, transparent, $grey, $grey);
}

.room {
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    width:100vw;
    padding: 3vw 5vw;
}

.room-code {
    font-size: 5rem;
    font-weight: 700;
}

.logo-img {
    height: 5rem;
}

.current-container {
    display: flex;
    flex-direction: row;
    width: 80vw;
    margin: 0 auto;
    z-index: 2;
}

.current-thumbnail {
    width: 20vw;
    height: 20vw;
    margin-right: 5vw;
    box-shadow: 0px 0px 2vw black;
    z-index: 2;
}

.current-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    height: 20vw;
    z-index: 2;
}

.current-text {
    margin-bottom: 5vw;
    z-index: 2;
}

.current-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 4rem;
    margin-bottom: 2vh;
    z-index: 2;
}

.explicit {
    border: solid 3px $lightred;
    padding: 5px 10px;
    margin-left: 20px;
    color: $lightred;
    font-size: 2rem;
    font-weight: 700;
}

.current-artist {
    font-size: 3rem;
    font-weight: 100;
    z-index: 2;
}

.progress-bar {
  width: 50vw;
  background-color: $lightgrey;
  z-index: 2;
}

.progress {
  width: 1%;
  height: 1vh;
  background-color: $lightred;
  z-index: 2;
}

.playlist-container {
    margin-top: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.playlist-item {
    width: 10vw;
    z-index: 2;
}

.song-thumbnail {
    width: 12vw;
    height: 12vw;
    box-shadow: 0px 0px 2vw black;
    margin-bottom: 10px;
}

.song-info {
    font-size: 1.2rem;
    font-weight: 400px;
}

.song-name {
    width: 12vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.song-artist {
    font-weight: 100px;
    color: $lightgrey;
    margin-top: 5px;
}

</style>

