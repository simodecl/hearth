<template>
    <div>
        <homelogo></homelogo>
        <form action="submit">
            <input type="text" placeholder="Enter code" />
            <button type="submit" class="btn btn-join">Join room</button>
        </form>
    </div>
</template>

<script>
import HomeLogo from '../components/HomeLogo'
export default {
    components: {
        'homelogo': HomeLogo
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik:700');
@import "../styles/variables.scss";

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

input {
    width: 276px;
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