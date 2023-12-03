const express = require("express");
const env = require("dotenv");
const cors = require("cors");

const app = express();

app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

env.config({
  path: "./secret.env",
});

const { SECRET_KEY } = process.env;

const database = require("./database/database.js");
const register = require("./account operation/register.js");
const login = require("./account operation/login.js");
const userData = require("./account operation/userData.js");
const AddId = require("./account operation/AddId.js");
const AllId = require("./account operation/AllId.js");
const DeleteId = require("./account operation/DeleteId.js");

function authorize(req, res, next) {
  let { key } = req.body;
  if (key == "" || key == undefined) {
    res.json({
      status: false,
      msg: "Provide Secret Key",
    });
  } else if (key !== SECRET_KEY) {
    res.json({
      status: false,
      msg: "Authorization Failed",
    });
  } else {
    next();
  }
}

app.use(authorize);

app.get("/", (req, res) => {
  res.json({
    status: true,
    msg: "Welcome",
  });
});

app.post("/login", (req, res) => {
  login(req, res, database);
});

app.post("/register", (req, res) => {
  register(req, res, database);
});

app.post("/userData", (req, res) => {
  userData(req, res, database);
});

app.post("/allId", async (req, res) => {
  AllId(req, res, database);
});

app.post("/addId", (req, res) => {
  AddId(req, res, database);
});

app.post("/deleteId", (req, res) => {
  DeleteId(req, res, database);
});

app.listen(500);
