<template>
    <div>
        Spotify mode
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
        play(uri) {
            const data = {
                uris: [uri]
            }
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, data)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
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
                volume: 0.5,
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
        playSong(uri) {
            this.play(uri)
        }
    },
}
</script>
