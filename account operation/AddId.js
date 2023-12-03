const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config({
  path: "../secret.env",
});

const { SECRET_KEY } = process.env;

async function AddId(req, res, database) {
  let { videoId, token } = req.body;

  try {
    let verify = await jwt.verify(token, SECRET_KEY);
    let user = await database.findOne({ _id: verify._id });

    if (user !== null) {
      let idArray = user.videoId;
      let exist = false;

      for (let index = 0; index < idArray.length; index++) {
        if (idArray[index] == videoId) {
          exist = true;
          break;
        }
      }

      if (exist) {
        res.json({
          status: false,
          msg: "Video Already Exists",
        });
      } else {
        await user.updateOne({ $push: { videoId } });
        res.json({
          status: true,
          msg: "Added To Watch Later",
        });
      }
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

module.exports = AddId;
