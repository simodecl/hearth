<template>
    <div class="main">
        <div v-if="loading">
            <p class="loading">css spinner emoji</p>
        </div>
        <ul id="results" v-else>
            <li class="result" v-for="(result, i) of results" :key="i">
                <img class="thumbnail" :src="result.snippet.thumbnails.default.url">
                <div class="details">
                    <div class="title">{{ result.snippet.title.length > 50 ? result.snippet.title.substring(0,50) + "..." : result.snippet.title }}</div>
                    <div class="channel">{{ result.snippet.channelTitle }}</div>
                </div>
                <div class="actions">
                    <v-icon class="red-color" v-if="inPlaylist(result.id.videoId)" v-on:click="removeFromPlaylist(result)">playlist_add_check</v-icon>
                    <v-icon v-if="!inPlaylist(result.id.videoId)" v-on:click="addToPlaylist(result)">playlist_add</v-icon>
                    <v-icon class="red-color" v-if="isFavourite(result.id.videoId)" v-on:click="removeFromFavourites(result)">star</v-icon>
                    <v-icon v-if="!isFavourite(result.id.videoId)" v-on:click="addToFavourites(result)">star_border</v-icon>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
// import YoutubeResult from '../components/YoutubeResult'
import { mapActions } from 'vuex'

export default {
    components: {
        // 'youtube-result': YoutubeResult
    },
    data() {
        return {
            results: [],
            searchQuery: '',
            loading: false,
            favs: []

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
        playlist() {
            return this.$store.getters['playlist']
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
        },
    },
    created() {
        this.getVideos()
    },
    methods: {
        ...mapActions([
        'UPDATE_YOUTUBE_PLAYLIST'
        ]),
        getVideos() {
            this.active = -1
            this.loading = true
            const vids = JSON.parse(localStorage.getItem('videos'))
            this.results = vids
            this.loading = false
        },
        addToPlaylist(video) {
            this.UPDATE_YOUTUBE_PLAYLIST({ 
                video: video, 
                action: 'add',
            })
        },
        removeFromPlaylist(video) {
            this.UPDATE_YOUTUBE_PLAYLIST({ 
                video: video, 
                action: 'delete',
            })
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
            for (let i =0; i < this.results.length; i++)
            if (this.results[i].id.videoId === video.id.videoId) {
                this.results.splice(i,1);
                break;
            }
            localStorage.setItem('videos', JSON.stringify(this.favs))
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
</style>