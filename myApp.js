require("dotenv").config();
let express = require("express");
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

const logger = function (req, res, next) { 
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use("/public", express.static(__dirname + "/public"));
app.use(logger);

app.get("/json", jsonResponse);
app.get("/", hello);

module.exports = app;