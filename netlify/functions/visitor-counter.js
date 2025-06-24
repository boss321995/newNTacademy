const admin = require('firebase-admin');
const path = require('path');
// Use the correct service account key filename (update if needed)
const serviceAccount = require('./counternt-firebase-adminsdk-fbsvc-9a95944395.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://counternt-default-rtdb.firebaseio.com' // updated to your Firebase project
  });
}

exports.handler = async function(event, context) {
  const db = admin.database();
  const ref = db.ref('counter');
  let count = (await ref.once('value')).val() || 0;
  count += 1;
  await ref.set(count);
  return {
    statusCode: 200,
    body: JSON.stringify({ count })
  };
};