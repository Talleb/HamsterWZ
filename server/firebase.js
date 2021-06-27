var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://talle-hamster.firebaseio.com"
});


const db = admin.firestore();

module.exports = {db}