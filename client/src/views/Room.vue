<template>
    <div>
        <youtube-mode v-if="active === 'youtube'"></youtube-mode>
        <spotify-mode v-if="active === 'spotify'"></spotify-mode>
        <images-mode v-if="active === 'images'"></images-mode>
        <div v-if="!active">
            <roomempty></roomempty>
            <div class="text" v-if="exists">
                <p>Your room code is:</p>
                <p class="code">{{ this.$route.params.roomid }}</p>    
            </div>
            <div class="text" v-if="!exists">This room does not exist</div>
        </div>
        
    </div>
</template>

<script>
import RoomEmpty from '../components/RoomEmpty'
import YoutubeMode from '../components/YoutubeMode'
import SpotifyMode from '../components/SpotifyMode'
import ImagesMode from '../components/ImagesMode'
import { db } from '@/firebase'

export default {
    name: 'Room',
    components: {
        'roomempty': RoomEmpty,
        'youtube-mode': YoutubeMode,
        'spotify-mode': SpotifyMode,
        'images-mode': ImagesMode,
    },
    data() {
        return {
            exists: false,
        }
    },
    computed: {
        roomRef () {
            return db.collection('rooms').doc(this.$route.params.roomid)
        },
        active() {   
            return this.$store.getters['active']
        }
    },
    created() {
        this.$store.commit('SET_ROOM', this.$route.params.roomid)
        this.checkRoom()
        this.listenForDbChanges(this.$store.state.room)
    },
    methods: {
        checkRoom() {
            this.roomRef.get()
                .then(roomdoc => {
                    if (!roomdoc.exists) {
                        this.exists = false
                    } else {
                        this.exists = true
                        this.$socket.emit('tv connect', this.$route.params.roomid)
                        this.$store.dispatch('SET_ACTIVE', 'spotify')
                    }
                })
                .catch(() => {
                    this.exists = false
                })
        },
        listenForDbChanges(roomcode) {
            db.collection("rooms").doc(roomcode)
                .onSnapshot((room) => {
                    this.$store.commit('GET_DB_CHANGE', room.data())
                })
        }
    }
}
</script>

<style lang="scss" scoped>


.text {
    text-align: center;
    margin-top: 20px;
    font-size: 1.5rem;
}

.code {
    font-size: 5rem;
}
</style>
