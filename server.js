/*
Libraries
*/
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./server/config/firebase.json');

/*
Custom Routes
*/
const routes = require('./server/config/routes');

/*
Settings
*/

const server = http.createServer(app)
const port = process.env.PORT || '8080';


/*
Firebase Settings
*/

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hearth-40878.firebaseio.com"
});

/*
Express.js settings
*/
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('', routes);
app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

/*
Launch server
*/
server.listen(port, () => {
    console.log(`Node server running on port ${port}!`)
});