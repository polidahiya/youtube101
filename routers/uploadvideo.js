const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose"); //install mongoose my command "npm i mongoose"
const { MongoClient } = require("mongodb");

const uploadvideo = express.Router();

//
const db_link =
  "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then( async function () {
    const client = new MongoClient(db_link);
    await client.connect()
    const db = client.db("youtube");
    const videos = db.collection("videos");
    const users = db.collection("users");
    console.log("db connected upload video");

    // 

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "routers/files/"); // Destination folder where the uploaded files will be stored
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename for the uploaded file
      },
    });
    
    let postno = Date.now();
    const upload = multer({ storage: storage });
    
    uploadvideo.post(
      "/uploadvideo",
      upload.fields([{ name: "image" }, { name: "video" }]),
      (req, res) => {
        try {
          if ("cookie" in req.headers) {
            const cookiedata = req.headers.cookie;
            const cookiesArray = cookiedata.split(";");
            const cookiesobject = {};
            cookiesArray.forEach((cookie) => {
              const [key, value] = cookie.trim().split("=");
              cookiesobject[key] = value.replace(/%40/g, "@");
            });
      
            if (cookiesobject.login) {
              try {
                users.findOne({ email: `${cookiesobject.email}` }).then((user) => {
                  let videodata = {
                    postno: postno,
                    postby: cookiesobject.email,
                    likes: "0",
                    views: "0",
                    title: req.body.title,
                    details: req.body.detail,
                    videotype: req.body.videotype,
                    videoname: req.files.video[0].filename,
                    thumbnailname: req.files.image[0].filename,
                    profilepicname: user.profilepicname,
                    channelname: user.channelname,
                  };
                  console.log(videodata);
                  videos.insertOne(videodata);
        
                  res.send("File uploaded successfully!");
                });
                
              } catch (error) {
                console.log(error);
              }
            } else {
              res.send("please login to upload files!");
            }
          } else {
            res.send("please login to upload files");
          }
  
        } catch (error) {
          console.log(error);
        }
             }
    );

  })
  .catch(function (err) {
    console.log(err);
  });
//



module.exports = uploadvideo;
