var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const getNextSequenceValue = require('../utils/SequenceIncrementer');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.register = async function (req, res) {
  var newUser = new UserModel(req.body);
  newUser._id = await getNextSequenceValue('userid')
  console.log("User id", newUser._id)
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
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

exports.sign_in = function (req, res) {
  UserModel.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    let token = jwt.sign({ email: user.email, name: user.name, _id: user._id, role: user.role }, secretKey, { expiresIn: '48h' })
    // console.log(token)
    return res.json({ access_token: token });
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};

exports.adminRequired = function (req, res, next) {
  const role = req.user['role'];
  if (role == 'admin') {
    next();
  } else {

    return res.status(401).json({ message: 'User not admin!' });
  }
};

exports.getProfile = function (req, res) {
  if (req.user) {
    return res.json(req.user);
  }
  else {

    return res.status(401).json({ message: 'Profile not found!' });
  }
}


exports.getUsers = function (req, res) {
  UserModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.json(result);
    }
  });
}

exports.getUser = function (req, res) {
  const { id } = req.query;
  UserModel.find({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'User not found' });
    }
    else if (result.length == 0 || result == undefined || result == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    else {
      return res.json(result[0]);
    }
  });
}

exports.getAvatar = function (req, res) {
  const { id } = req.query;
  UserModel.find({ _id: id }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'User not found' });
    }
    else if (result.length == 0 || result == undefined || result == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    else {
      return res.json(result[0]['avatar']);
    }
  });
}


exports.updateUser = async function (req, res) {
  const { id } = req.query;
  const update = req.body;
  try {
    const newProduct = await UserModel.findOneAndUpdate(id, update, {
      new: true
    });
    console.log(newProduct)
    res.json(newProduct)
  }
  catch (error) {
    return res.status(404).send({ message: "User not found!" });
  }
}

exports.deleteUser = async function (req, res) {
  const { id } = req.query;
  try {
    await UserModel.deleteOne({ _id: id });
    res.send(200, "User removed")
  }
  catch (error) {
    return res.status(404).send({ message: "User not found!" });
  }
}