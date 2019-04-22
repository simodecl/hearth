<template>
    <div>
        <homelogo></homelogo>
        <div class="btns">
            <button v-on:click="createRoom" class="btn btn-create">Create room</button>
            <router-link to="/join">
                <button class="btn btn-join">Join room</button>
            </router-link>
        </div>
        <img class="corner" src="/assets/corner.png" />
        <a class="github" href="http://github.com/simodecl/hearth" target="__blank">
            <v-icon>$vuetify.icons.github</v-icon>
        </a>
        <footer class="copyright">&copy; Arteveldehogeschool, opleiding Grafische &amp; Digitale Media</footer>
    </div>
</template>

<script>
import HomeLogo from '../components/HomeLogo'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        'homelogo': HomeLogo
    },
    methods: {
        createRoom(){
            axios.post('/api/v1/rooms').then((room) => {
                this.joinRoom(room.data)
            })
        },
        joinRoom(code) {
            this.$router.push({ path: `/room/${code}` })
        }
    }
}
</script>


<style lang="scss" scoped>

.btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
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

.corner {
    position: absolute;
    bottom: 32px;
    width: 30vw;
    max-width: 150px;
}

.github {
    position: absolute;
    left: 25px;
    bottom: 60px;
    z-index: 1;
}

.github .v-icon {
    color: white !important;
    font-size: 3.5rem;
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