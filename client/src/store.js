import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ROOM, GET_YOUTUBE_PLAYLIST } from './mutation-types'
import { fb, db } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: '',
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
    [GET_YOUTUBE_PLAYLIST](state, videos) {
      state.youtube.playlist = []
      state.youtube.playlist.push(...videos)
    }
    
  },
  actions: {
    ADD_TO_YOUTUBE_PLAYLIST({ state }, {video, id}) {
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
    }
  },
  getters: {
    playlist(state) {
        return state.youtube.playlist
    }
  }
})
