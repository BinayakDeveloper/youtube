const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config({
  path: "../secret.env",
});

const { SECRET_KEY } = process.env;

async function AllId(req, res, database) {
  let { token } = req.body;

  try {
    let verify = await jwt.verify(token, SECRET_KEY);
    let user = await database.findOne({ _id: verify._id });

    if (user !== null) {
      res.json({
        status: true,
        videoIds: user.videoId,
      });
    } else {
      res.json({
        status: false,
        msg: "User Not Found",
      });
    }
  } catch (err) {
    res.json({
      status: false,
      msg: "User Not Found",
    });
  }
}
module.exports = AllId;
