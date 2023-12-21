const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    // "mongodb+srv://admin:admin@cluster0.udfwpx5.mongodb.net/?retryWrites=true&w=majority",
    "mongodb://0.0.0.0:27017",
    {
      dbName: "youtube",
    }
  )
  .then(() => {
    console.log("Database Connected Successfully");
  });

let schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  videoId: {
    type: Array,
  },
  token: [
    {
      token: String,
    },
  ],
});

let model = mongoose.model("model", schema, "account");

module.exports = model;
