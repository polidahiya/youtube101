const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const login = express.Router();
login.route("/login").post(postlogin);

const db_link =
  "mongodb+srv://polidahiya830:12er56ui90%40Poli@cluster0.pvrgiqn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(db_link);
const db = client.db("youtube");
const users = db.collection("users");
const usersdata = db.collection("usersdata");

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

function postlogin(req, res) {
  console.log(2);
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);
  
  const query = { email: `${email}` };
  users.findOne(query).then((user) => {
    if(user){
      if (user.password == password) {
        user.message = "login successfully";
        res.cookie("login",true, { httpOnly: true,sameSite:"lax",maxAge:24* 60 * 60 * 1000  })
        res.cookie(`email`,`${email}`, { httpOnly: true,sameSite:"lax",maxAge: 24 * 60 * 60 * 1000 })
        res.cookie(`profilepicname`,`${user.profilepicname}`, { httpOnly: false,sameSite:"lax",maxAge: 24 * 60 * 60 * 1000 })
        // res.setHeader('Set-Cookie', [`login=true;HttpOnly`, `email=${email};HttpOnly`])
          .send(user);
      } else {
        user.message = "Wrong password";
        res.send(user);
      }
    }
    else{
        res.json({
          message : "User not found"
        });
    }
  });
}

module.exports = login;
