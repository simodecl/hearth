const request = require('request')
const errorHandler = require('./../utilities/errorHandler')

const tokenOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}` },
    form: { grant_type: 'client_credentials' },
    json: true
}

exports.search_songs = (req, res, next) => {
	request.post(tokenOptions, (error, response) => {
		if (!error) {
			// use the access token to access the Spotify Web API
			const token = response.body.access_token
			const searchOptions = {
				url: 'https://api.spotify.com/v1/search?q=' + req.query.q.replace(' ', '%20') + '&type=track&limit=10',
				headers: {
					Authorization: `Bearer ${token}`
				},
				json: true
			};
			request.get(searchOptions, (error, response) => {
				if (!error) {
                    return res.json(response.body.tracks.items)
                }
                else {
                    return errorHandler.handleAPIError(505, error || 'There was a problem trying to find songs', next)
                }
			})
        }
        else {
            return errorHandler.handleAPIError(505, error || 'There was a problem trying to get spotify token', next)
        }
	})
}