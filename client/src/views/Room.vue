<template>
    <div>
        <youtube-mode v-if="active === 'youtube'"></youtube-mode>
        <spotify-mode v-if="active === 'spotify'"></spotify-mode>
        <images-mode v-if="active === 'images'"></images-mode>
        <div v-if="!active">
            <roomempty></roomempty>
            <div class="text" v-if="room">
                <p>Your room code is:</p>
                <p class="code">{{ this.$route.params.roomid }}</p>    
            </div>
            <div class="text" v-if="!room">This room does not exist</div>
        </div>
        
    </div>
</template>

<script>
import RoomEmpty from '../components/RoomEmpty'
import YoutubeMode from '../components/YoutubeMode'
import SpotifyMode from '../components/SpotifyMode'
import ImagesMode from '../components/ImagesMode'
import { db } from '@/firebase'
import { setTimeout } from 'timers'

export default {
    name: 'Room',
    components: {
        'roomempty': RoomEmpty,
        'youtube-mode': YoutubeMode,
        'spotify-mode': SpotifyMode,
        'images-mode': ImagesMode,
    },
    computed: {
        roomRef () {
            return db.collection('rooms').doc(this.$route.params.roomid)
        },
        room() {   
            return this.$store.getters['room']
        },
        active() {   
            return this.$store.getters['active']
        }
    },
    created() {
        setTimeout(() => {
            this.checkRoom()
            console.log(this.room)
            this.listenForDbChanges(this.room)
        }, 2000)
    },
    sockets: {
        active(mode) {
            this.$store.dispatch('SET_ACTIVE', mode)
        }
    },
    methods: {
        checkRoom() {
            this.roomRef.get()
                .then(roomdoc => {
                    if (!roomdoc.exists) {
                        console.log('This room does not exist')
                    } else {
                        this.$store.commit('SET_ROOM', this.$route.params.roomid)
                        this.$socket.emit('tv connect', this.$route.params.roomid)
                    }
                })
                .catch((error) => {
                    console.error(error)
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
