const express = require('express');
const sendimages=express.Router();
sendimages.get('/sendimages/:imagename', (req, res) => {
  const { imagename } = req.params;
  const start=(imagename.replace(/:/g, ""))
  const imagePath = __dirname+`/files/${start}`;
  res.sendFile(imagePath);
});

module.exports=sendimages