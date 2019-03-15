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
    },
    // [UPDATE_YOUTUBE_PLAYLIST](state, video) {
    //   state.youtube.playlist.push(video)
    // },
    
  },
  actions: {
    UPDATE_YOUTUBE_PLAYLIST({ state }, {video, action}) {
      const room = db.collection('rooms').doc(state.room)
      if (action === 'add') {
        room.update({
          youtube_playlist: fb.firestore.FieldValue.arrayUnion(video)
        })
      }
      if (action === 'delete') {
        room.update({
          youtube_playlist: fb.firestore.FieldValue.arrayRemove(video)
        })
      }
    }
  },
  getters: {
    playlist(state) {
        return state.youtube.playlist
    }
  }
})
