const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config({
  path: "../secret.env",
});

let { SECRET_KEY } = process.env;

async function register(req, res, database) {
  let { name, email, password } = req.body;
  let userExistance = await database.findOne({ email });
  if (userExistance == null) {
    let encryptedPass = await bcrypt.hash(password, 10);

    let userData = await database({
      name,
      email,
      password: encryptedPass,
    });

    let token = await jwt.sign({ _id: userData.id }, SECRET_KEY);

    userData.token = userData.token.concat({ token });

    await userData.save();

    res.json({
      status: true,
      msg: "Registered Successfully",
    });
  } else {
    res.json({
      status: false,
      msg: "User Already Exists",
    });
  }
}
module.exports = register;
