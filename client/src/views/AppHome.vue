<template>
    <div>
        <homelogo class="logo"></homelogo>
        <div v-if="error" class="error"> {{ error }}</div>
        <form v-on:submit.prevent="joinRoom()">
            <input type="text" v-model="code" placeholder="Enter code" />
            <button type="submit" class="btn btn-join">Join room</button>
        </form>
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
            code: '',
            error: ''
        }
    },
    methods: {
        joinRoom() {
            db.collection('rooms').doc(this.code).get()
            .then(roomdoc => {
                if (!roomdoc.exists) {
                    this.error = 'This room does not exist'
                } else {
                    this.$router.push({ path: `/app/room/${this.code}/youtube` })
                }
            })
            .catch((error) => {
                this.error = 'There was a problem trying to join the room.'
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.logo {
    margin-bottom: 30px;
}

.error {
    display: block;
    background-color: $darkred;
    color: white;
    padding: 10px;
    margin-top: 20px;
    font-size: 1.4rem;
    text-align: center;
    margin: 0 auto;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

input {
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
}

.btn {
    width: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border: solid 1px white;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
}

.btn-create {
    background-color: $darkred;
}

.btn-join {
    background-color: $lightred;
}
</style>