const serviceAccount = require('../../../config/firebase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hearth-40878.firebaseio.com"
});

const db = admin.firestore()
exports.create_room = (res, req, next) => {

}