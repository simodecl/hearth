const request = require('request')
const querystring = require('querystring')
const errorHandler = require('./../utilities/errorHandler')

const tokenOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}` },
    form: { grant_type: 'client_credentials' },
    json: true
}

const generateRandomString = (length) => {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}
  
const stateKey = 'spotify_auth_state'

exports.login = (req, res) => {

	const stateRandom = generateRandomString(16)
	const room = req.query.room
	res.cookie(stateKey, stateRandom)
	const state = {
		room: room,
		stateRandom: stateRandom
	}
	console.log(JSON.stringify(state))

	const scope = 'user-read-private user-read-email user-read-playback-state'
	res.redirect('https://accounts.spotify.com/authorize?' +
	querystring.stringify({
		response_type: 'code',
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: process.env.REDIRECT_URI,
		state: JSON.stringify(state)
	}))
}
  
exports.callback = (req, res) => {
	const code = req.query.code || null
	const state = JSON.parse(req.query.state) || null
	const storedState = req.cookies ? req.cookies[stateKey] : null
	if (state.stateRandom === null || state.stateRandom !== storedState) {
		return res.json({ error: 'state_mismatch' })
	} else {
		res.clearCookie(stateKey)
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: process.env.REDIRECT_URI,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`
			},
			json: true
		}
  
		request.post(authOptions, (error, response, body) => {
			if (!error && response.statusCode === 200) {
  
			res.redirect(`http://localhost:8080/app/room/${state.room}/spotify?${querystring.stringify(body)}`)
			} else {
		//   res.redirect('/#' +
		// 	querystring.stringify({
		// 	  error: 'invalid_token'
		// 	}))
				return res.json(error)
			}
		})
	}
}
  
//   app.get('/refresh_token', function(req, res) {
  
// 	// requesting access token from refresh token
// 	var refresh_token = req.query.refresh_token
// 	var authOptions = {
// 	  url: 'https://accounts.spotify.com/api/token',
// 	  headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
// 	  form: {
// 		grant_type: 'refresh_token',
// 		refresh_token: refresh_token
// 	  },
// 	  json: true
// 	}
  
// 	request.post(authOptions, function(error, response, body) {
// 	  if (!error && response.statusCode === 200) {
// 		var access_token = body.access_token
// 		res.send({
// 		  'access_token': access_token
// 		})
// 	  }
// 	})
//   })
  

exports.search_songs = (req, res, next) => {
	request.post(tokenOptions, (error, response) => {
		if (!error) {
			// use the access token to access the Spotify Web API
			const token = response.body.access_token
			const searchOptions = {
				url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(req.query.q)}&type=track&limit=10`,
				headers: {
					Authorization: `Bearer ${token}`
				},
				json: true
			}
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