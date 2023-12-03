const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config({
  path: "../secret.env",
});

const { SECRET_KEY } = process.env;

async function DeleteId(req, res, database) {
  let { token, videoId } = req.body;

  try {
    let verify = await jwt.verify(token, SECRET_KEY);
    let user = await database.findOne({ _id: verify._id });

    if (user !== null) {
      let tokenIndex = Array.from(user.videoId).indexOf(videoId);

      if (tokenIndex !== -1) {
        let oldArr = user.videoId;

        oldArr.splice(tokenIndex, 1);

        await user.updateOne({ $set: { videoId: oldArr } });

        res.json({
          status: true,
          msg: "Removed From Watch Later",
        });
      } else {
        res.json({
          status: false,
          msg: "No Such Video Saved",
        });
      }
    }
  } catch (err) {
    res.json({
      status: false,
      msg: "User Not Found",
    });
  }
}

module.exports = DeleteId;
