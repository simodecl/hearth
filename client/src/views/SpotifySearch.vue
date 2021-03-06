<template>
    <div class="main">
        <form class="search"  v-on:submit.prevent="getVideos">
            <input type="text" placeholder="Search songs" v-model="searchQuery">
            <button type="submit">
                <v-icon>search</v-icon>
            </button>
        </form>
        <div v-if="loading">
            <spinner></spinner>
        </div>
        <ul id="results" v-else>
            <li class="result" v-for="(result, i) of results" :key="i">
                <img class="thumbnail" :src="result.album.images[1].url">
                <div class="details">
                    <div class="title">{{ result.name > 50 ? result.name.substring(0,50) + "..." : result.name }}</div>
                    <div class="channel">{{ result.artists[0].name }}</div>
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
import Spinner from '../components/spinner'

export default {
    components: {
        'spinner': Spinner
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
        isFavourite() {
            return (id) => {
                if (this.favs) {
                    const filtered = this.favs.filter(song => song.id === id)
                    return filtered.length === 1
                } else {
                    return false
                }
                
            }
        },
    },
    created() {
        this.setTitle()
    },
    methods: {
        async getVideos() {
            this.active = -1
            this.loading = true
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(this.searchQuery)}&type=track&limit=10`)
            this.results = response.data.tracks.items
            this.loading = false
        },
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
        },
        setTitle() {
            this.$parent.$parent.$parent.title = 'Search'
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