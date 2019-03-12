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
FIREBASE_DB=https://database-13579.firebaseio.com
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
