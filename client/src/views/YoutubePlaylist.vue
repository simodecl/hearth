<template>
    <div class="main">
        <section v-if="currentVideo" class="currentVideo">
            <div class="subtitle">Current Song</div>
            <div v-if="currentVideo" class="result">
                <img class="thumbnail" :src="currentVideo.snippet.thumbnails.default.url">
                <div class="details">
                    <div class="title">{{ currentVideo.snippet.title.length > 50 ? currentVideo.snippet.title.substring(0,50) + "..." : currentVideo.snippet.title }}</div>
                    <div class="channel">{{ currentVideo.snippet.channelTitle }}</div>
                </div>
            </div>
            <div class="buttons">
                <v-icon class="red-color" v-if="isFavourite(currentVideo.id.videoId)" v-on:click="removeFromFavourites(currentVideo)">star</v-icon>
                <v-icon v-if="!isFavourite(currentVideo.id.videoId)" v-on:click="addToFavourites(currentVideo)">star_border</v-icon>
            
                <v-icon v-if="!playing" class="toggle-play" v-on:click="play()">play_circle_outline</v-icon>
                <v-icon v-if="playing" class="toggle-play" v-on:click="pause()">pause_circle_outline</v-icon>
            
                <v-icon v-on:click="skip()">skip_next</v-icon>
            </div>
        </section>
        <div v-else class="buttons">
            <v-icon>star_border</v-icon>
        
            <v-icon v-if="!playing" class="toggle-play" v-on:click="play()">play_circle_outline</v-icon>
            <v-icon v-if="playing" class="toggle-play" v-on:click="pause()">pause_circle_outline</v-icon>
        
            <v-icon v-on:click="skip()">skip_next</v-icon>
        </div>
        <div class="subtitle">Next up</div>
        <draggable v-if="playlist.length > 0" v-model="playlist" id="results">
            <transition-group>
                <div class="result" v-for="(vid, i) of playlist" :key="`key-${i}`">
                    <img class="thumbnail" :src="vid.snippet.thumbnails.default.url">
                    <div class="details">
                        <div class="title">{{ vid.snippet.title.length > 50 ? vid.snippet.title.substring(0,50) + "..." : vid.snippet.title }}</div>
                        <div class="channel">{{ vid.snippet.channelTitle }}</div>
                    </div>
                    <div class="actions">
                        <v-icon v-on:click="removeFromPlaylist(vid)">clear</v-icon>
                        <v-icon class="red-color" v-if="isFavourite(vid.id.videoId)" v-on:click="removeFromFavourites(vid)">star</v-icon>
                        <v-icon v-if="!isFavourite(vid.id.videoId)" v-on:click="addToFavourites(vid)">star_border</v-icon>
                    </div>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import axios from 'axios'
import draggable from "vuedraggable"

export default {
    components: {
        draggable
    },
    data() {
        return {
            favs: [],
            dragging: false,
            enabled: true
        }
    },
    created() {
        this.setTitle()
    },
    mounted() {
        if (localStorage.getItem('videos')) {
            try {
                this.favs = JSON.parse(localStorage.getItem('videos'));
            } catch(e) {
                localStorage.removeItem('videos');
            }
        }
    },
    computed: {
        currentVideo() {
            return this.$store.getters['currentVideo']
        },
        active() {
            return this.$store.getters['active']
        },
        device() {
            return this.$store.getters['spotifyDevice']
        },
        playing() {
            return this.$store.getters['playing']
        },
        playlist: {
            set(playlist) {
                this.$store.dispatch('UPDATE_YOUTUBE_PLAYLIST', playlist)
            },
            get() {
                return this.$store.getters['playlist']
            }
        },
        inPlaylist() {
            return (id) => {
                const filtered = this.playlist.filter(vid => vid.id.videoId === id)
                return filtered.length === 1
            }
        },
        isFavourite() {
            return (id) => {
                if (this.favs) {
                    const filtered = this.favs.filter(vid => vid.id.videoId === id)
                    return filtered.length === 1
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        removeFromPlaylist(video) {
            this.$store.dispatch('REMOVE_FROM_YOUTUBE_PLAYLIST', video)
        },
        addToFavourites(video) {           
            this.favs.push(video)
            localStorage.setItem('videos', JSON.stringify(this.favs))
        },
        removeFromFavourites(video) {
            for (let i =0; i < this.favs.length; i++)
            if (this.favs[i].id.videoId === video.id.videoId) {
                this.favs.splice(i,1);
                break;
            }
            localStorage.setItem('videos', JSON.stringify(this.favs))
        },
        play() {
            if (this.active !== 'youtube') {
                axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${this.device}`)
                this.$store.dispatch('SONG_PLAYING', false)
                this.$store.dispatch('SET_ACTIVE', 'youtube')
                this.$store.dispatch('PLAY_VIDEO')
            } else {
                this.$store.dispatch('PLAY_VIDEO')
            }
        },
        pause() {
            this.$store.dispatch('PAUSE_VIDEO')
        },
        skip() {
            if (this.active !== 'youtube') {
                axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${this.device}`)
                this.$store.dispatch('SONG_PLAYING', false)
                this.$store.dispatch('SET_ACTIVE', 'youtube')
                this.$store.dispatch('PLAY_NEXT_VIDEO')
            } else {
                this.$store.dispatch('PLAY_NEXT_VIDEO')
            }
        },
        setTitle() {
            this.$parent.$parent.$parent.title = 'Playlist'
        }
    }
}
</script>

<style lang="scss" scoped>


.main {
    margin: 20px;
}

.search {
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
}

.search input {
    border-bottom: solid 2px $lightgrey;
    text-align: left;
    width: 95%;
}

.search .v-icon {
    font-size: 30px;
    color: white;
}

.result {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
}

.details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
    margin-left: 10px;
    width: 100%;
}

.title {
    font-size: 1.1rem !important;
}

.channel {
    color: $lightgrey;
}

.actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
}

.actions .v-icon {
    color: white;
    font-size: 24px;
}

.actions .red-color {
    color: $lightred;
}

.likes {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.play-arrow {
    color: white !important;
    font-size: 30px;
}

.subtitle {
    color: $lightgrey;
    border-bottom: solid 2px $lightgrey;
    padding-bottom: 5px;
    width: fit-content;
    margin: 20px 0 10px;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
}

.buttons * {
    color: white !important;
    font-size: 30px;
}

.buttons .red-color {
    color: $lightred !important;
}

.toggle-play {
    font-size: 50px;
}
</style>