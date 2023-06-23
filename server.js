const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port=process.env.PORT
app.listen(port||3001);
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
console.log("listening server");


app.use(express.static("./build"));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const home = require("./routers/home.js");
const signup = require("./routers/signup.js");
const login = require("./routers/login.js");
const uploadvideo = require("./routers/uploadvideo.js");
const streamvideo = require("./routers/streamvideo.js");
const sendimages = require("./routers/sendimages.js");

app.get("/home/:videotype", home);
app.post("/signup", signup);
app.post("/login", login);
app.post("/uploadvideo", uploadvideo);
app.get("/streamvideo/:videoname", streamvideo);
app.get("/sendimages/:imagename", sendimages);

