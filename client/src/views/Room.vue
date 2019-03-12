<template>
    <div>
        <roomempty></roomempty>
        <div class="text" v-if="exists">
            <p>Your room code is:</p>
            <p class="code">{{ this.$route.params.roomid }}</p>    
        </div>
        <div class="text" v-if="!exists">This room does not exist</div>
    </div>
</template>

<script>
import RoomEmpty from '../components/RoomEmpty'
import { db } from '@/firebase'

export default {
    name: 'Room',
    components: {
        'roomempty': RoomEmpty
    },
    data() {
        return {
            exists: false,
        }
    },
    computed: {
        roomRef () {
            return db.collection('rooms').doc(this.$route.params.roomid)
        }
    },
    created() {
        this.checkRoom()
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
                    }
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
