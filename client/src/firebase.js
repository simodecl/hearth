import Vue from 'vue'
import VueFire from 'vuefire'
import * as firebase from 'firebase/firebase'
import 'firebase/firestore'

const config = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DB,
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER
}

Vue.use(VueFire)
firebase.initializeApp(config)
export const db = firebase.firestore()
