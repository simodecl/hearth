<template>
  <div>
    <img class="logo" src="../assets/hearth_logo_multicolor.png" />
    <h1 class="title">Hearth</h1>
    <div class="subtitle">Pull up a chair by the Hearth!</div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Rubik:700');
@import "../styles/variables.scss";

.logo {
    display: block;
    margin: 0 auto;
    height: 250px;
    max-height: 25vh;
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
</style>