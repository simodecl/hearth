<template>
    <div class="main">
        <v-icon class="play-arrow" v-on:click="play(playlist[0].id.videoId)">play_arrow</v-icon>
        <draggable v-model="playlist" id="results">
            <transition-group>
                <div class="result" v-for="(vid, i) of playlist" :key="i">
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
// import YoutubeResult from '../components/YoutubeResult'
import draggable from "vuedraggable"

export default {
    components: {
        draggable
        // 'youtube-result': YoutubeResult
    },
    data() {
        return {
            favs: [],
            dragging: false,
            enabled: true
        }
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
        socketId() {
            return this.$socket.io.engine.id
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
        play(id) {
            this.$socket.emit('playVideo', id)
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
</style>