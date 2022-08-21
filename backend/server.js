const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const routes = require('./routes/routes');
require('dotenv').config();

app.use(express.json())
app.use(cors())

const monogdbURI = process.env.MONGODB_URI
const secretKey = process.env.SECRET_KEY

mongoose.connect(monogdbURI).then(function () {
  console.log("Connected Successfully")
}, function (err) {
  console.log(err)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(req.headers.authorization)
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jsonwebtoken.verify(token, secretKey, function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Server Started On: ' + port);

module.exports = app;