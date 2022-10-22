require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let app = express();

function hello(req, res) {
  absolutePath = __dirname + "/views/index.html";
  console.log(absolutePath);
  res.sendFile(absolutePath);
}

function jsonResponse(req, res) {
  const message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  const obj = {
    message
  };
  res.json(obj);
}

function name(req, res) {
  const { first, last } = req.query;
  const obj = {
    name: `${first} ${last}`
  };
  res.json(obj);
}

function postName(req, res) {
  const { first, last } = req.body;
  const obj = {
    name: `${first} ${last}`
  };
  res.json(obj);
}

const echo = function(req, res) {
  const { word } = req.params;
  res.json({ echo: word });
}

const logger = function (req, res, next) { 
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(__dirname + "/public"));
app.use(logger);

app.get(
  "/now",
  function (req, res, next) {
    const time = new Date().toString();
    req.time = time;
    next();
  },
  function (req, res) {
    res.json({time: req.time});
  }
);
app.get("/name", name).post("/name", postName);
app.get("/json", jsonResponse);
app.get("/:word/echo", echo);
app.get("/", hello);

module.exports = app;