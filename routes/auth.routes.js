const { Router } = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = Router();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

router.post("/login", jsonParser, (req, res) => {
  try {
    const googleJwt = jwt.decode(req.body.token);
    const user = {
      email: googleJwt.email,
      name: googleJwt.name,
      picture: googleJwt.picture,
      givenName: googleJwt["given_name"],
      familyName: googleJwt["family_name"],
      locale: googleJwt.locale,
    };

    const token = jwt.sign(googleJwt, config.get("jwtSecret"));
    res.json({ token, user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
