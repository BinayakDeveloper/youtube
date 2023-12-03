const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, database) {
  let { email, password } = req.body;
  let userExistance = await database.findOne({ email });
  if (userExistance == null) {
    res.json({
      status: false,
      msg: "Invalid Login Credentials",
    });
  } else {
    let passCompare = await bcrypt.compare(password, userExistance.password);
    if (passCompare === true) {
      res.json({
        status: true,
        token: userExistance.token[0].token,
      });
    } else {
      res.json({
        status: false,
        msg: "Invalid Login Credentials",
      });
    }
  }
}

module.exports = login;
