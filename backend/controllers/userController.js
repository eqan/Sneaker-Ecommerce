var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
const UserModel = require('../models/User')
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.register = function(req, res) {
  var newUser = new UserModel(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = function(req, res) {
  UserModel.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, secretKey, {expiresIn: '1500s'}) });
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  console.log("here is happening something")
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }

};

exports.getUsers = function(req, res, next) {
  UserModel.find({}, (err, result) => {
    if (err) {
      return res.status(401).json({ message: 'User Invalid' });
    } else {
      return res.json(result);
    }
  });
}

