<template>
    <div>
        <homelogo></homelogo>
        <form class="form-join" @submit.prevent="joinRoom()">
            <input class="input-join" type="text" placeholder="Enter code" v-model="room"/>
            <button type="submit" class="btn-join">Join room</button>
        </form>
        <img class="corner" src="/assets/corner.png" />
        <footer class="copyright">&copy; Arteveldehogeschool, opleiding Grafische &amp; Digitale Media</footer>
    </div>
</template>

<script>
import HomeLogo from '../components/HomeLogo'
import { db } from '@/firebase'

export default {
    components: {
        'homelogo': HomeLogo
    },
    data() {
        return {
            room: '',
            error: ''
        }
    },
    methods: {
        joinRoom() {
           db.collection('rooms').doc(this.room).get()
            .then(roomdoc => {
                if (!roomdoc.exists) {
                    this.error = 'This room does not exist'
                } else {
                    this.$router.push({ path: `/room/${this.room}` })
                }
            })
            .catch((error) => {
                this.error = 'There was a problem trying to join the room.'
            })
        }
    }
}
</script>

<style scoped lang="scss">

.form-join {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.input-join {
    width: 300px;
    margin: 0;
    margin-bottom: 10px;
    padding: 10px;
    border: solid 1px $lightred;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: bold;
    color: $lightred;
    text-align: center;
    background-color: white;
}

.btn-join {
    width: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border: solid 1px white;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    background-color: $lightred;
}

.btn-create {
    background-color: $darkred;
}

.corner {
    position: absolute;
    bottom: 0px;
    width: 30vw;
    max-width: 150px;
}

.copyright {
    position: absolute;
    bottom: 0px;
    width: 100vw;
    text-align: center;
    background-color: black; 
    padding: 10px;
}
</style>