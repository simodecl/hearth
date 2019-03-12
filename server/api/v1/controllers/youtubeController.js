const errorHandler = require('./../utilities/errorHandler')
const axios = require('axios')

exports.search_videos = (req, res, next) => {
    if(!req.query || !req.query.q) {
        return errorHandler.handleAPIError(400, 'Your request does not contain a search query', next)
    }

    axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${req.query.q}&key=${process.env.YOUTUBE_API_KEY}&maxResults=10`)
        .then((youtube) => {
            return res.json(youtube.data.items)
        })
        .catch(err => {
            return errorHandler.handleAPIError(505, err || 'There was a problem trying to find videos', next)
        })
}