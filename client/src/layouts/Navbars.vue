<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" app class="sidenav">
        <div class="logo-container">
            <img class="logo" src="/assets/hearth_logo_multicolor.png" />
        </div>
        <div class="nav-list">
          <router-link class="nav-list-item" v-for="item in items" :key="item.title" :to="`/app/room/${$route.params.roomid}/${item.link}`">
            <v-icon>{{ item.icon }}</v-icon>
            <div>{{ item.title }}</div>
          </router-link>
        </div>
        <router-link class="nav-exit" to="/app">
          <v-icon>exit_to_app</v-icon>
          <div>Exit room</div>
        </router-link>
    </v-navigation-drawer>
    <v-content :class="{ 'drawer-open': drawer }">
        <v-toolbar class="toolbar">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>

        </v-toolbar>
            <slot/>
        <div class="spacer"></div>
        <v-bottom-nav class="tabnav" :class="{ 'push-bottomnav': drawer }" :value="true" absolute>
            <v-btn :to="`/app/room/${this.$route.params.roomid}/youtube`">
                <span>Youtube</span>
                <v-icon>$vuetify.icons.youtube</v-icon>
            </v-btn>
            <v-divider inset vertical></v-divider>
            <v-btn :to="`/app/room/${this.$route.params.roomid}/spotify`">
                <span>Spotify</span>
                <v-icon>$vuetify.icons.spotify</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-content>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Navbars',
    data () {
        return {
            drawer: null,
            items: [],
            title: 'Hearth'
        }
    },
    computed: {
        state () {
            return this.$store.state
        }
    },
    created() {
        this.SET_ROOM(this.$route.params.roomid)
        this.getState(this.state.room)
        this.$socket.emit('app connect')
    },
    methods: {
        ...mapMutations([
        'SET_ROOM',
        'GET_DB_CHANGE'
        ]),
        getState(roomcode) {
            db.collection("rooms").doc(roomcode)
                .onSnapshot((room) => {
                    this.GET_DB_CHANGE(room.data())
                })
        }

    }
}
</script>

<style lang="scss" scoped>
html {
  overflow: scroll !important;
}

.spacer {
    height:70px;
}

.toolbar {
    background-color: $grey !important;
    height: 60px !important;
}

.sidenav {
    background-color: $grey !important;
    color: white !important;
    width: 80px !important;
    height: 100vh !important;
}

.logo-container {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
   margin: 0 auto;
}

.nav-list {
    height: calc(100vh - 118px);
    background: url('/assets/bar.png') 100%;
    width: 80px;
}

.nav-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    text-decoration: none;
}

.nav-list-item div {
    color: white;
    background-color: transparent;
    text-decoration: none;
}

.nav-exit {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    height: 56px;
    text-decoration: none;
    color: white;
}

.v-icon {
    color: white !important;
    font-size: 24px !important;
}

.nav-list-item .v-icon {
    font-size: 30px !important;
}

.logo {
    height: 40px;
    margin: 0 auto;
}

.tabnav {
    background-color: $grey;
    position: fixed;
    bottom: 0px;
    height: 65px;
}

.tabnav .v-btn {
    max-width: 100% !important;
}

.tabnav .v-btn .v-btn__content span, .tabnav .v-btn .v-btn__content .v-icon {
    color: white !important;
}

.tabnav .v-btn--active .v-btn__content span, .tabnav .v-btn--active .v-btn__content .v-icon {
    color: $lightred !important;
}

.tabnav .v-divider {
    border-color: $lightgrey !important;
}

// .drawer-open {
//     margin-left: 80px;
// }

// .push-bottomnav {
//     left: 80px !important;
// }
</style>