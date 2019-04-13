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
      playing: false,
      current: null,
      playlist: [],
      history: [],
      access_token: null,
      refresh_token: null,
      expires_in: null
    }
  },
  mutations: {
    [SET_ROOM](state, room) {
      state.room = room
    },
    [GET_DB_CHANGE](state, data) {
      state.active = data.active
      state.youtube.current = data.youtube_now
      data.youtube_playlist ? state.youtube.playlist = data.youtube_playlist : state.youtube.playlist = []
      data.youtube_history ? state.youtube.history = data.youtube_history : state.youtube.history = []
      state.spotify.current = data.spotify_now
      data.spotify_playing ? state.spotify.playing = data.spotify_playing : state.spotify.playing = false
      data.spotify_playlist ? state.spotify.playlist = data.spotify_playlist : state.spotify.playlist = []
      data.spotify_history ? state.spotify.history = data.spotify_history : state.spotify.history = []
      data.spotify_access_token ? state.spotify.access_token = data.spotify_access_token : state.spotify.access_token = ''
      data.spotify_refresh_token ? state.spotify.refresh_token = data.spotify_refresh_token : state.spotify.refresh_token = ''
      data.spotify_expires_in ? state.spotify.expires_in = data.spotify_expires_in : state.spotify.expires_in = ''
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
    ADD_TO_SPOTIFY_PLAYLIST({ state }, song ) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_playlist: fb.firestore.FieldValue.arrayUnion(song)
      })
    },
    REMOVE_FROM_SPOTIFY_PLAYLIST({ state }, song) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_playlist: fb.firestore.FieldValue.arrayRemove(song)
      })
    },
    UPDATE_SPOTIFY_PLAYLIST({ state }, playlist) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_playlist: playlist
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
      const playlist = state.youtube.playlist
      const current = state.youtube.current
      let history = state.youtube.history
      const newCurrent = playlist[0]
      const newPlaylist = playlist.splice(1)
      if (current) {

        history.length > 0 ? history.push(current) : history = [current]
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
    PLAY_SONG({ state }) {
      const room = db.collection('rooms').doc(state.room)
      const playlist = state.spotify.playlist
      const current = state.spotify.current
      const newCurrent = playlist[0]
      const newPlaylist = playlist.splice(1)
      if (!current) {
        room.update({
          spotify_playing: true,
          spotify_playlist: newPlaylist,
          spotify_now: newCurrent
        })
        this._vm.$socket.emit('playSong', newCurrent)
      } else {
        room.update({
          spotify_playing: true,
        })
        this._vm.$socket.emit('playSong', current)
      }
    },
    PAUSE_SONG({state}) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_playing: false
      })
      this._vm.$socket.emit('pauseSong')
    },
    PLAY_NEXT_SONG({ state }) {
      const room = db.collection('rooms').doc(state.room)
      const current = state.spotify.current
      const playlist = state.spotify.playlist
      const history = state.spotify.history
      let newHistory
      history.length > 0 ? newHistory = [...history, current] : newHistory = [current]
      const newCurrent = playlist[0]
      const newPlaylist = playlist.splice(1)
  
      room.update({
        spotify_playlist: newPlaylist,
        spotify_now: newCurrent,
        spotify_history: newHistory
      })

      this._vm.$socket.emit('playSong', newCurrent)
    },
    SONG_PLAYING({state}, boolean) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_playing: boolean,
      })
    },
    SET_TOKENS({ state }, query) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_access_token: query.access_token,
        spotify_refresh_token: query.refresh_token,
        spotify_expires_in: query.expires_in
      })
    },
    SET_ACCESS_TOKEN({ state }, token) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_access_token: token
      })
    },
    DELETE_TOKENS({ state }) {
      const room = db.collection('rooms').doc(state.room)
      room.update({
        spotify_access_token: '',
        spotify_refresh_token: '',
        spotify_expires_in: ''
      })
    },
  },
  getters: {
    playlist(state) {
      return state.youtube.playlist
    },
    history(state) {
      return state.youtube.history.reverse()
    },
    currentVideo(state) {
      return state.youtube.current
    },
    spotifyPlaying(state) {
      return state.spotify.playing
    },
    spotifyPlaylist(state) {
      return state.spotify.playlist
    },
    spotifyHistory(state) {
      return state.spotify.history.reverse()
    },
    currentSong(state) {
      return state.spotify.current
    },
    active(state) {
      return state.active
    },
    accessToken(state) {
      return state.spotify.access_token
    }
  }
})
