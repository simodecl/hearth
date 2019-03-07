const express = require('express')
const router = express.Router()

const roomController = require('./controllers/roomController')

router.post('/rooms', roomController.create_room)
router.post('/rooms/:room/join', roomController.join_room)
router.post('/rooms/:room/leave', roomController.leave_room)

module.exports = router