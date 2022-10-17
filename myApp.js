let app = express();

function hello(req, res) {
  absolutePath = __dirname + "/views/index.html";
  console.log(absolutePath);
  res.sendFile(absolutePath);
}

function jsonResponse(req, res) {
  const obj = {
    message: "Hello json",
  };
  res.json(obj);
}
app.use("/public", express.static(__dirname + "/public"));

app.get("/json", jsonResponse);
app.get("/", hello);
