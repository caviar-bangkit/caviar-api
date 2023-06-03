const admin = require("../config/firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorizationHeader.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new Middleware();