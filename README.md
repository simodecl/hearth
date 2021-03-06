# Hearth

## Project setup
```
npm install
```
## Front-end scripts

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Back-end scripts

### Start server with auto-reload for development
```
npm run server
```

---
## Environment Variables

```
BASE_URL=http://url.com
FIREBASE_DB=https://database-13579.firebaseio.com
FIREBASE_PRIVATE_KEY_ID=<firebase_private_key_id>
FIREBASE_PRIVATE_KEY=<firebase_private_key>
REDIRECT_URI=http://url.com/api/callback
SPOTIFY_CLIENT_ID=<spotify_client_id>
SPOTIFY_CLIENT_SECRET=<spotify_client_secret>
VUE_APP_FIREBASE_DB=https://database-13579.firebaseio.com
VUE_APP_FIREBASE_APIKEY=<firebase_api_key>
VUE_APP_FIREBASE_DOMAIN=database-13579.firebaseapp.com
VUE_APP_FIREBASE_PROJECTID=database-13579
VUE_APP_FIREBASE_BUCKET=database-13579.appspot.com
VUE_APP_FIREBASE_SENDER=<firebase_sender_id>
YOUTUBE_API_KEY=<youtube_api_key>
```

---
## API Routes

### Create a new room
```
POST /api/v1/rooms
```

### Search YouTube videos
```
GET /api/v1/youtube/search?q=<search_query>
```

### Login with Spotify
```
GET /api/v1/spotify/login
```
