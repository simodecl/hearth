<template>
    <div>
        <homelogo></homelogo>
        <form class="form-join" @submit.prevent="joinRoom">
            <input class="input-join" type="text" placeholder="Enter code" v-model="room"/>
            <button type="submit" class="btn-join">Join room</button>
        </form>
        <img class="corner" src="../assets/corner.png" />
    </div>
</template>

<script>
import HomeLogo from '../components/HomeLogo'
export default {
    components: {
        'homelogo': HomeLogo
    },
    data() {
        return {
            room: ''
        }
    },
    methods: {
        joinRoom() {
            this.$router.push({ path: `/room/${this.room}` })
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
</style>