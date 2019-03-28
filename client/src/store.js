import Vue from 'vue'
import Vuex from 'vuex'
import { SET_ROOM, GET_DB_CHANGE } from './mutation-types'
import { fb, db } from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: '',
    active: null,
    youtube: {
      current: null,
      playlist: [],
      history: []
    },
    spotify: {
      current: null,
      playlist: [],
      history: []
    }
  },
  mutations: {
    [SET_ROOM](state, room) {
      state.room = room
    },
    [GET_DB_CHANGE](state, data) {
      console.log(data)
      state.active = data.active
      state.youtube.current = data.youtube_now
      data.youtube_playlist ? state.youtube.playlist = data.youtube_playlist : state.youtube.playlist = []
      data.youtube_history ? state.youtube.history = data.youtube_history : state.youtube.history = []
      console.log(state)
    }
    
  },
  actions: {
    ADD_TO_YOUTUBE_PLAYLIST({ state }, video ) {
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
    },
    PLAY_VIDEO({ state }) {
      const room = db.collection('rooms').doc(state.room)
      console.log(state)
      const playlist = state.youtube.playlist
      const current = state.youtube.current
      let history = state.youtube.history
      const newCurrent = playlist[0]
      const newPlaylist = playlist.splice(1)
      console.log(newCurrent)
      if (current) {

        history.length > 0 ? history.push(current) : history = [current]
        console.log(history)
        room.update({
          youtube_history: history,
        })
      }
      room.update({
        youtube_playlist: newPlaylist,
        youtube_now: newCurrent
      })

      this._vm.$socket.emit('playVideo', newCurrent.id.videoId)

    },
    PLAY_NEXT_VIDEO({ state }) {
      const room = db.collection('rooms').doc(state.room)
      const current = state.youtube.current
      const playlist = state.youtube.playlist
      let history = state.youtube.history
      history.length > 0 ? history.push(current) : history = [current]
      const newCurrent = playlist[0]
      const newPlaylist = playlist.splice(1)
  
      room.update({
        youtube_playlist: newPlaylist,
        youtube_now: newCurrent,
        youtube_history: history
      })

      this._vm.$socket.emit('playVideo', newCurrent.id.videoId)
    },
  },
  getters: {
    playlist(state) {
      return state.youtube.playlist
    },
    currentVideo(state) {
      return state.youtube.current
    },
    active(state) {
      return state.active
    }
  }
})
