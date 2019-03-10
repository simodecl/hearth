<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Spotify mode</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full" md-overlay="false">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img class="logo" src="../assets/hearth_logo_multicolor.png" />
        </md-toolbar>

        <div class="nav-list">
          <div class="nav-list-item">
            <md-icon>search</md-icon>
            <div>Search</div>
          </div>
          <div class="nav-list-item">
            <md-icon>playlist_play</md-icon>
            <div>Playlist</div>
          </div>
          <div class="nav-list-item">
            <md-icon>history</md-icon>
            <div>History</div>
          </div>
          <div class="nav-list-item">
            <md-icon>star</md-icon>
            <div>Favourites</div>
          </div>
        </div>
  
        <div class="nav-exit">
          <md-icon>exit_to_app</md-icon>
          <div>Exit room</div>
        </div>
      </md-app-drawer>

      <md-app-content>
        <md-tabs>
          <md-tab id="tab-home" md-label="Home" md-icon="youtube"></md-tab>
          <md-tab id="tab-pages" md-label="Pages" md-icon="pages"></md-tab>
          <md-tab id="tab-posts" md-label="Posts" md-icon="../assets/spotify.svg"></md-tab>
          <md-tab id="tab-favorites" md-label="Favorites" md-icon="favorite"></md-tab>
        </md-tabs>
      </md-app-content>
      
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'SideNav',
    data: () => ({
      menuVisible: false
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
  .md-app {
    height: 100vh;
  }

  .md-content {
    background-color: $darkgrey !important;
    color: white !important;
  }

  .md-toolbar {
    background-color: $grey !important;
    color: white !important;
  }
  .md-drawer {
    background-color: $grey !important;
    color: white !important;
    width: 80px;
    height: 100vh;
  }

  .nav-list {
    height: calc(100vh - 125px);
    background: url('../assets/bar.png') 100%;
    width: 80px;
  }

  .nav-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }

  .nav-exit {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5px;
    height: 56px;
  }

  .nav-list-item .md-icon {
    font-size: 30px !important;
  }
  .md-icon {
    color: white !important;
  }
  .logo {
    height: 40px;
    margin: 0 auto;
  }
  .md-tabs {
    background-color: transparent !important;
  }
</style>
