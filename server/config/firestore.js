const serviceAccount = require('./firebase.json')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB
});

const db = admin.firestore()

module.exports = db