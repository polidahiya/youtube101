const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const streamvideo = express.Router();
console.log("stream");
streamvideo.get("/streamvideo/:videoname", (req, res) => {
  const videoname = req.params.videoname.replace(/:/g, "");
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("send header range");
  }
  const videoPath = __dirname + "/files/" + videoname;
  const videoSize = fs.statSync(__dirname + "/files/" + videoname).size;

  const chunkSize = 20 ** 6;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

module.exports = streamvideo;
