const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/setcookie', (req, res) => {
 console.log("setreq");

res.setHeader('Set-Cookie', ['login=true;HttpOnly', 'email=polida0@gmail.com;HttpOnly;sameSite=lax']);
 res.json({
  msg:"hello"
 })
});
app.get('/getcookie', (req, res) => {
 const cookie =req.headers.cookie
 console.log(cookie);
 res.json({
  msg:"cookies sent"
 })
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
