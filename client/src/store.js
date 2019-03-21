import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ROOM, SET_ACTIVE, GET_YOUTUBE_PLAYLIST } from './mutation-types'
import { fb, db } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: '',
    active: null,
    youtube: {
      current: {},
      playlist: [],
      history: []
    },
    spotify: {
      current: {},
      playlist: [],
      history: []
    }
  },
  mutations: {
    [SET_ROOM](state, room) {
      state.room = room
    },
    [SET_ACTIVE](state, mode) {
      state.active = mode
    },
    [GET_YOUTUBE_PLAYLIST](state, videos) {
      state.youtube.playlist = []
      state.youtube.playlist.push(...videos)
    }
    
  },
  actions: {
    ADD_TO_YOUTUBE_PLAYLIST({ state }, { video }) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        youtube_playlist: fb.firestore.FieldValue.arrayUnion(video)
      })
    },
    REMOVE_FROM_YOUTUBE_PLAYLIST({ state }, video) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        youtube_playlist: fb.firestore.FieldValue.arrayRemove(video)
      })
    },
    UPDATE_YOUTUBE_PLAYLIST({ state }, playlist) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        youtube_playlist: playlist
      })
    },
    SET_ACTIVE({ state }, mode) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        active: mode
      })
    }
  },
  getters: {
    playlist(state) {
        return state.youtube.playlist
    },
    active(state) {
      return state.active
    }
  }
})
