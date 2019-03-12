<template>
    <div class="main">
        <form class="search"  v-on:submit.prevent="getVideos">
            <input type="text" placeholder="Search videos" v-model="searchQuery">
            <button type="submit">
                <v-icon>search</v-icon>
            </button>
        </form>
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
            </li>
        </ul>

    </div>
</template>

<script>
// import YoutubeResult from '../components/YoutubeResult'
import axios from 'axios'

export default {
    name: 'Room',
    components: {
        // 'youtube-result': YoutubeResult
    },
    data() {
        return {
            results: [],
            searchQuery: '',
            volume: '',
            loading: false,
            active: -1,
            videoTitle: 'No video playing',
            duration: '0:00',
            progress: '0:00'

        }
    },
    computed: {
        
    },
    created() {
      
    },
    methods: {
        async getVideos() {
            this.active = -1
            this.loading = true
            const response = await axios.get(`/api/v1/youtube/search?q=${this.searchQuery}`)
            this.results = response.data
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

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
</style>