const db = require('../config/firestore')

const RoomManager = {}

RoomManager.join = (roomcode, socketid) => {
    const roomRef = db.collection('rooms').doc(roomcode)

    roomRef.get()
        .then(room => {
            if (room.exists) {
                const conns = room.data().connections
                conns.push(socketid)
                roomRef.update({
                    connections: conns
                })
            }
        })
}

RoomManager.leave = (roomcode, socketid) => {
    const roomRef = db.collection('rooms').doc(roomcode)
    roomRef.get()
        .then(room => {
            if (room.exists) {
                const conns = room.data().connections
                const filteredConns = conns.filter((socket) => {
                    return socket != socketid
                });
                roomRef.update({
                    connections: filteredConns
                })
                if (!filteredConns.length) {
                    roomRef.delete()
                } 
                
            }
        })
}

module.exports = RoomManager