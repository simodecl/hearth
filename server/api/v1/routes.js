const express = require('express')
const router = express.Router()

const roomController = require('./controllers/roomController')
const youtubeController = require('./controllers/youtubeController')

router.post('/rooms', roomController.create_room)
router.get('/youtube/search', youtubeController.search_videos)

module.exports = router