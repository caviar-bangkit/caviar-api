const firebase = require("firebase-admin");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

// check if service account is not set
if (!serviceAccount) {
  console.error("Firebase service account is not set");
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

// if firebase admin is not initialized show error
if (!firebase.apps.length) {
  console.error("Firebase admin is not initialized");
}

class Middleware {
  async decodeToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Welcome to CAVIAR API, but sorry you have no access to this API." });
    }
    const token = authorizationHeader.split(" ")[1];
    try {
      const decodeValue = await firebase.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({ message: "Welcome to CAVIAR API, but sorry you have no access to this API." });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new Middleware();
