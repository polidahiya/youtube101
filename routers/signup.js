const express = require("express");
const mongoose = require("mongoose"); //install mongoose my command "npm i mongoose"
const { MongoClient } = require("mongodb");
const multer = require("multer");

const signup = express.Router();

const db_link =
  "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(db_link);
const db = client.db("youtube");
const users = db.collection("users");

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routers/files/"); // Destination folder where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for the uploaded file
  },
});
//
const upload = multer({ storage: storage });
//

signup.post("/signup", upload.single("profilepic"), (req, res) => {
  let email = req.body.email;
  console.log(req.file);
  let userdata = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    channelname: req.body.channelname,
    profilepicname:req.file.filename
  };

  const query = { email: `${email}` };
  users.findOne(query).then((user) => {
    if (user) {
      console.log(2);
      res.send("user exist");
    } else {
      users.insertOne(userdata);
      console.log(userdata);
      res.send("signup sussessfully");
    }
  });
});

module.exports = signup;
