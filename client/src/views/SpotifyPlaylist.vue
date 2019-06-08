<template>
    <div class="main">
        <section v-if="currentSong" class="currentSong">
            <div class="subtitle">Current Song</div>
            <div v-if="currentSong" class="result">
                <img class="thumbnail" :src="currentSong.album.images[1].url">
                <div class="details">
                    <div class="title">{{ currentSong.name }}</div>
                    <div class="channel">{{ currentSong.artists[0].name }}</div>
                </div>
            </div>
            <div class="buttons">
                <v-icon class="red-color" v-if="isFavourite(currentSong.id)" v-on:click="removeFromFavourites(currentSong)">star</v-icon>
                <v-icon v-if="!isFavourite(currentSong.id)" v-on:click="addToFavourites(currentSong)">star_border</v-icon>
            
                <v-icon v-if="!spotifyPlaying" class="toggle-play" v-on:click="play()">play_circle_outline</v-icon>
                <v-icon v-if="spotifyPlaying" class="toggle-play" v-on:click="pause()">pause_circle_outline</v-icon>
            
                <v-icon v-on:click="skip()">skip_next</v-icon>
            </div>
        </section>
        <div v-else class="buttons">
            <v-icon>star_border</v-icon>
        
            <v-icon v-if="!spotifyPlaying" class="toggle-play" v-on:click="play()">play_circle_outline</v-icon>
            <v-icon v-if="spotifyPlaying" class="toggle-play" v-on:click="pause()">pause_circle_outline</v-icon>
        
            <v-icon v-on:click="skip()">skip_next</v-icon>
        </div>
        <div class="subtitle">Next up</div>
        <draggable v-if="playlist.length > 0" v-model="playlist" id="results">
            <transition-group>
                <div class="result" v-for="(song, i) of playlist" :key="`key-${i}`">
                    <img class="thumbnail" :src="song.album.images[1].url">
                    <div class="details">
                        <div class="title">{{ song.name.length > 50 ? song.name.substring(0,50) + "..." : song.name }}</div>
                        <div class="channel">{{ song.artists[0].name }}</div>
                    </div>
                    <div class="actions">
                        <v-icon v-on:click="removeFromPlaylist(song)">clear</v-icon>
                        <v-icon class="red-color" v-if="isFavourite(song.id)" v-on:click="removeFromFavourites(song)">star</v-icon>
                        <v-icon v-if="!isFavourite(song.id)" v-on:click="addToFavourites(song)">star_border</v-icon>
                    </div>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable"
import { setTimeout } from 'timers';

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
        if (localStorage.getItem('songs')) {
            try {
                this.favs = JSON.parse(localStorage.getItem('songs'));
            } catch(e) {
                localStorage.removeItem('songs');
            }
        }
    },
    computed: {
        currentSong() {
            return this.$store.getters['currentSong']
        },
        active() {
            return this.$store.getters['active']
        },
        spotifyPlaying() {
            return this.$store.getters['spotifyPlaying']
        },
        playlist: {
            set(playlist) {
                this.$store.dispatch('UPDATE_SPOTIFY_PLAYLIST', playlist)
            },
            get() {
                return this.$store.getters['spotifyPlaylist']
            }
            
        },
        inPlaylist() {
            return (id) => {
                const filtered = this.playlist.filter(song => song.id === id)
                return filtered.length === 1
            }
        },
        isFavourite() {
            return (id) => {
                if (this.favs) {
                    const filtered = this.favs.filter(song => song.id === id)
                    return filtered.length === 1
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        removeFromPlaylist(song) {
            this.$store.dispatch('REMOVE_FROM_SPOTIFY_PLAYLIST', song)
        },
        addToFavourites(song) {           
            this.favs.push(song)
            localStorage.setItem('songs', JSON.stringify(this.favs))
        },
        removeFromFavourites(song) {
            for (let i = 0; i < this.favs.length; i++) {
                if (this.favs[i].id === song.id) {
                    this.favs.splice(i,1);
                    break;
                }
            }
            localStorage.setItem('songs', JSON.stringify(this.favs))
        },
        play() {
            if (this.active !== 'spotify') {
                this.$store.dispatch('PAUSE_VIDEO')
                this.$store.dispatch('SET_ACTIVE', 'spotify')
                this.$store.dispatch('VIDEO_PLAYING', false)
                this.$store.dispatch('PLAY_SONG')

    
            } else {
                this.$store.dispatch('PLAY_SONG')
            }
        },
        pause() {
            this.$store.dispatch('PAUSE_SONG')
        },
        skip() {
            if (this.active !== 'spotify') {
                this.$store.dispatch('SET_ACTIVE', 'spotify')
                this.$store.dispatch('VIDEO_PLAYING', false)
                this.$store.dispatch('PLAY_NEXT_SONG')

    
            } else {
                this.$store.dispatch('PLAY_NEXT_SONG')
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

.subtitle {
    color: $lightgrey;
    border-bottom: solid 2px $lightgrey;
    padding-bottom: 5px;
    width: fit-content;
    margin: 20px 0 10px;
}

.result {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    justify-content: space-between;
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

.thumbnail {
    height: 90px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
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