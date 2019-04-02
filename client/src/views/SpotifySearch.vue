<template>
    <div class="main">
        <div v-if="spotifyToken">
            {{spotifyToken}}
        </div>
        <div v-else>
            <button @click="login()">Login with spotify</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {

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
        spotifyToken() {
            return this.$store.getters['spotifyToken']
        }
    },
    created() {
        
    },
    methods: {
        login() {
            console.log('yeet')
            axios.get('/api/v1/auth/spotify').then(() => {
                console.log('Worked')
            })
            console.log('yote')
        }

    }
}
</script>

<style lang="scss" scoped>

</style>