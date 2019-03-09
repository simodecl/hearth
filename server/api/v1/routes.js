const express = require('express')
const router = express.Router()

const roomController = require('./controllers/roomController')

router.post('/rooms', roomController.create_room)

module.exports = router