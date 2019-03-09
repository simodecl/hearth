<template>
    <div>
        <homelogo></homelogo>
        <div class="btns">
            <button class="btn btn-create">Create room</button>
            <router-link to="/join">
                <button class="btn btn-join">Join room</button>
            </router-link>
        </div>
        <img class="corner" src="../assets/corner.png" />
    </div>
</template>

<script>
import HomeLogo from '../components/HomeLogo'
export default {
    name: 'Home',
    components: {
        'homelogo': HomeLogo
    }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rubik:700');
@import "../styles/variables.scss";

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
    bottom: 0px;
    width: 30vw;
    max-width: 150px;
}
</style>