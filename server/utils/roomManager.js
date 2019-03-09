const db = require('../config/firestore')

const RoomManager = {}

RoomManager.join = (roomcode, socketid) => {
    if(!socketid) {
        console.log('No socketid')
    }

    const roomRef = db.collection('rooms').doc(roomcode)

    roomRef.get()
        .then(room => {
            if (!room.exists) {
                console.log('Room does not exist')
            } else {
                const conns = room.data().connections
                conns.push(socketid)
                roomRef.update({
                    connections: conns
                })
            }
        })
        .catch(err => {
            console.log(err)
        });
}

RoomManager.leave = (roomcode, socketid) => {
    if(!socketid) {
        console.log('No socketid')
    }

    const roomRef = db.collection('rooms').doc(roomcode)
    roomRef.get()
        .then(room => {
            if (!room.exists) {
                console.log('Room does not exist')
            } else {
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
        .catch(err => {
            console.log(err)
        });
}

module.exports = RoomManager