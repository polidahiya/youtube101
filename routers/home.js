const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const home = express.Router();

const app = express();
app.use(cookieParser());

//
const db_link = "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";

//

mongoose
  .connect(db_link)
  .then(async function () {
    const client =await new MongoClient(db_link);
    const db =await client.db("youtube");
    // const users = db.collection("users");
    const videos =await db.collection("videos");
    console.log("db connected home");
    home.get("/home/:videotype", async (req, res) => {
      try {
        const { videotype } = req.params;
        const video = videotype.replace(/:/g, "");

        const data = await videos.find({ videotype: video }).toArray();
        // const data = await videos.find({videotype:video}).exec();   mongo@6
        // const data = await videos.find({ postby: "email" }).toArray();
        console.log("Retrieved data:", data);
        res.json(data);
        console.log("home req");
      } catch (error) {
        console.log("gethome error:" + error);
      }
    });
  })
  .catch(function (err) {
    console.log(err);
  });
//

module.exports = home;
