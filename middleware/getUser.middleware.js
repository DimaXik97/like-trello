const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization; // "Bearer TOKEN"

    if (!token) {
      req.user = {};
      return next();
    }

    const decoded = jwt.verify(token.split(" ")[1], config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(500).json({ message: "Error!" });
  }
};
