const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config({
  path: "../secret.env",
});

const { SECRET_KEY } = process.env;

async function userData(req, res, database) {
  let { token } = req.body;

  try {
    let verify = await jwt.verify(token, SECRET_KEY);
    let id = verify._id;
    let user = await database.findOne({ _id: id });
    res.json({
      status: true,
      data: {
        name: user.name,
        email: user.email,
        id: user.videoId,
      },
    });
  } catch {
    res.json({
      status: false,
      msg: "No User Found",
    });
  }
}

module.exports = userData;
