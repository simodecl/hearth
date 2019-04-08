const request = require('request')
const querystring = require('querystring')

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
				return res.json(error)
			}
		})
	}
}
  
exports.refresh = (req, res) => {
  
	// requesting access token from refresh token
	const refresh_token = req.body.refresh_token
	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`},
		form: {	
			grant_type: 'refresh_token',
			refresh_token: refresh_token
		},
		json: true
	}

	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			const access_token = body.access_token
			return res.send({ 'access_token': access_token })
		}
	})
}
  