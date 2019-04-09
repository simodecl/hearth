/*
Libraries
*/
require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const RoomManager = require('./server/utils/roomManager')


/*
Custom Routes
*/
const routes = require('./server/config/routes')

/*
Socket.io
*/
const views = {}
const appviews = {}

io.on('connection', (socket) => {
    socket.on('tv connect', (roomcode) => {
        console.log('A TV connected')
        views[socket.id] = socket
        views[socket.id].room = roomcode
        RoomManager.join(views[socket.id].room, socket.id)
    })
    socket.on('app connect', () => {
        console.log('An app user connected')
        appviews[socket.id] = socket
    })
    socket.on('playVideo', (data) => {
        for(let id in views) {
            console.log('play video')
            const view = views[id]
            view.emit('playVideo', data)
        }
 
    })
    socket.on('playSong', (data) => {
        for(let id in views) {
            console.log('play video')
            const view = views[id]
            view.emit('playSong', data)
        }
 
    })
    socket.on('disconnect', () => {
        if(views[socket.id]) {
            console.log('A TV disconnected')
            RoomManager.leave(views[socket.id].room, socket.id)
            delete views[socket.id]
        }
        if(appviews[socket.id]) {
            console.log('An app user disconnected')
            delete appviews[socket.id]
        }
    })
})


/*
Express.js settings
*/
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('', routes)
app.use((req, res, next) => {
    const err = new Error('Not Found!')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
    })
})

/*
Launch server
*/
const port = process.env.PORT || '8000'
server.listen(port, () => {
    console.log(`Node server running on port ${port}!`)
})