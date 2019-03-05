import firebase from 'firebase'

const config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DB,
    projectId: process.env.FIREBASE_ID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER
}
firebase.initializeApp(config)