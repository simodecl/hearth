<template>
    <div class="main">
        <ul id="results" v-if="history">
            <li class="result" v-for="(result, i) of history" :key="i">
                <img class="thumbnail" :src="result.album.images[1].url">
                <div class="details">
                    <div class="title">{{ result.snippet.title.length > 50 ? result.snippet.title.substring(0,50) + "..." : result.snippet.title }}</div>
                    <div class="channel">{{ result.snippet.channelTitle }}</div>
                </div>
                <div class="actions">
                    <v-icon class="red-color" v-if="inPlaylist(result.id)" v-on:click="removeFromPlaylist(result)">playlist_add_check</v-icon>
                    <v-icon v-if="!inPlaylist(result.id)" v-on:click="addToPlaylist(result)">playlist_add</v-icon>
                    <v-icon class="red-color" v-if="isFavourite(result.id)" v-on:click="removeFromFavourites(result)">star</v-icon>
                    <v-icon v-if="!isFavourite(result.id)" v-on:click="addToFavourites(result)">star_border</v-icon>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            favs: []

        }
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
        playlist() {
            return this.$store.getters['spotifyPlaylist']
        },
        inPlaylist() {
            return (id) => {
                const filtered = this.playlist.filter(song => song.id === id)
                return filtered.length === 1
            }
        },
        history() {
            return this.$store.getters['spotifyHistory']
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
        
    },
    methods: {
        addToPlaylist(song) {
            this.$store.dispatch('ADD_TO_SPOTIFY_PLAYLIST', song)
        },
        removeFromPlaylist(song) {
            this.$store.dispatch('REMOVE_FROM_SPOTIFY_PLAYLIST', song)
        },
        addToFavourites(song) {
            this.favs.push(song)
            localStorage.setItem('songs', JSON.stringify(this.favs))
        },
        removeFromFavourites(song) {
            for (let i =0; i < this.favs.length; i++)
            if (this.favs[i].id === song.id) {
                this.favs.splice(i,1);
                break;
            }
            localStorage.setItem('songs', JSON.stringify(this.favs))
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    margin: 20px;
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

</style>