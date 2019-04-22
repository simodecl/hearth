const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "hearth-40878",
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-90nnn@hearth-40878.iam.gserviceaccount.com",
        "client_id": "101641751707903439433",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-90nnn%40hearth-40878.iam.gserviceaccount.com"
    }),
    databaseURL: process.env.FIREBASE_DB
});

const db = admin.firestore()

module.exports = db