const express = require('express')
const router = express.Router()

const roomController = require('./controllers/roomController')
const youtubeController = require('./controllers/youtubeController')
const spotifyController = require('./controllers/spotifyController')

router.post('/rooms', roomController.create_room)
router.get('/youtube/search', youtubeController.search_videos)
router.post('/spotify/search', spotifyController.search_songs)


module.exports = router