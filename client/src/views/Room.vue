<template>
    <div>
        <youtube-mode v-show="active === 'youtube'"></youtube-mode>
        <spotify-mode ></spotify-mode>
        <div v-show="!active">
            <roomempty></roomempty>
            <div class="text" v-if="roomExists">
                <p>Your room code is:</p>
                <p class="code">{{ this.$route.params.roomid }}</p>    
            </div>
            <div class="text" v-if="!roomExists">This room does not exist yet or is being created.</div>
        </div>
        
    </div>
</template>

<script>
import RoomEmpty from '../components/RoomEmpty'
import YoutubeMode from '../components/YoutubeMode'
import SpotifyMode from '../components/SpotifyMode'
import { db } from '@/firebase'

export default {
    name: 'Room',
    components: {
        'roomempty': RoomEmpty,
        'youtube-mode': YoutubeMode,
        'spotify-mode': SpotifyMode,
    },
    data() {
        return {
            roomExists: false
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
    mounted() {
        this.checkRoom()
        this.$store.watch(
            (state, getters) => getters.room,
            (newValue, oldValue) => {
                
                if (newValue !== null) {
                    this.roomExists = true
                    this.$forceUpdate()
                    oldValue = newValue
                }
            },
        );
        this.listenForDbChanges(this.$route.params.roomid)
    },
    methods: {
        async checkRoom() {
            const roomdoc = await this.roomRef.get()
            const exists = await roomdoc.exists

            if (exists) {
                this.$store.commit('SET_ROOM', this.$route.params.roomid)
                this.$socket.emit('tv connect', this.$route.params.roomid)
            }
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
