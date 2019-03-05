<template>
    <div>
        <img class="logo" src="../assets/hearth_logo_multicolor.png" />
        <h1 class="title">Hearth</h1>
        <div class="subtitle">Pull up a chair by the Hearth!</div>
        <form action="submit">
            <input type="text" placeholder="Enter code" />
            <button class="btn btn-join">Join room</button>
        </form>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rubik:700');
@import "../styles/variables.scss";

.logo {
    display: block;
    margin: 0 auto;
    height: 250px;
    padding-top: 50px;
}

.title {
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    font-size: 4rem;
    margin-top: 10px;
}

.subtitle {
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    text-align: center;
    color: $lightgrey;
    font-size: 1.4rem;
}

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