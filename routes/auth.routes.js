const { Router } = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

const User = require("../models/User");

const router = Router();
var jsonParser = bodyParser.json();

router.post("/login", jsonParser, async (req, res) => {
  try {
    const googleJwt = jwt.decode(req.body.token);
    const candidate = await User.findOne({ email: googleJwt.email });
    if (!candidate) {
      const user = new User({
        email: googleJwt.email,
        uid: googleJwt.sub,
      });
      await user.save();
    }
    if (candidate && candidate.uid !== googleJwt.sub) {
      return res.status(400).json({ message: "Error data" });
    }
    const user = {
      email: googleJwt.email,
      name: googleJwt.name,
      picture: googleJwt.picture,
      givenName: googleJwt["given_name"],
      familyName: googleJwt["family_name"],
      locale: googleJwt.locale,
    };
    googleJwt.exp = googleJwt.exp + 365 * 60 * 60 * 24;
    const token = jwt.sign(googleJwt, config.get("jwtSecret"));
    res.json({ token, user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
