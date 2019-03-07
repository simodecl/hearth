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
        code: random,
        connections: []
    })
    if (newRoom) {
        return res.json(random)
    } else {
        return errorHandler.handleAPIError(505, 'Could not create a new room', next)
    }
}

exports.join_room = (req, res, next) => {
    if(!req.body || !req.body.socket) {
        return errorHandler.handleAPIError(400, 'Your request does not contain a socket ID', next)
      }

    const roomRef = db.collection('rooms').doc(req.params.room)

    roomRef.get()
        .then(room => {
            if (!room.exists) {
                return errorHandler.handleAPIError(404, 'This room does not exist', next)
            } else {
                const conns = room.data().connections
                conns.push(req.body.socket)
                roomRef.update({
                    connections: conns
                })
                return res.json(`Connected to room with code ${req.params.room}`)
            }
        })
        .catch(err => {
            return errorHandler.handleAPIError(505, err || 'Could not join room', next)
        });
}

exports.leave_room = (req, res, next) => {
    if(!req.body || !req.body.socket) {
        return errorHandler.handleAPIError(400, 'Your request does not contain a socket ID', next)
      }

    const roomRef = db.collection('rooms').doc(req.params.room)

    roomRef.get()
        .then(room => {
            if (!room.exists) {
                return errorHandler.handleAPIError(404, 'This room does not exist', next)
            } else {
                const conns = room.data().connections
                const filteredConns = conns.filter((socket) => {
                    return socket != req.body.socket
                });
                roomRef.update({
                    connections: filteredConns
                })
                if (filteredConns.length) {
                    return res.json(`Successfully left room with code ${req.params.room}`)
                } else {
                    roomRef.delete()
                    return res.json('Successfully left and destroyed room')
                }
                
            }
        })
        .catch(err => {
            return errorHandler.handleAPIError(505, err || 'Could not join room', next)
        });
}