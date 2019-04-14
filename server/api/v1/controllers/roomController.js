const errorHandler = require('./../utilities/errorHandler')
const db = require('../../../config/firestore')

exports.create_room = (req, res, next) => {
    //Generate random 4 digit ID
    const random = Math.floor(1000 + Math.random() * 9000)
    const newRoom = db.collection('rooms').doc(random.toString()).set({
        active: '',
        code: random,
        connections: [],
        youtube_now: {},
        youtube_playing: false,
        youtube_playlist: [],
        youtube_history: [],
        spotify_now: {},
        spotify_playing: false,
        spotify_playlist: [],
        spotify_history: [],
        spotify_access_token: '',
        spotify_expires_in: '',
        spotify_refresh_token: ''
    })
    if (newRoom) {
        return res.json(random)
    } else {
        return errorHandler.handleAPIError(505, 'There was a problem trying to create room', next)
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
            return errorHandler.handleAPIError(505, err || 'There was a problem trying to join room', next)
        })
}
