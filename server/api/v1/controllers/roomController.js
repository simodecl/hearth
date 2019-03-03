const serviceAccount = require('../../../config/firebase.json')
const admin = require('firebase-admin')
const errorHandler = require('./../utilities/errorHandler')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB
});

const db = admin.firestore()
exports.create_room = (req, res, next) => {
    //Generate random 4 digit ID
    const random = Math.floor(1000 + Math.random() * 9000)
    const newRoom = db.collection('rooms').doc(random.toString()).set({
        code: random
    })
    if (newRoom) {
        return res.json(random)
    } else {
        return errorHandler.handleAPIError(505, 'Could not create a new room', next);  
    }
}