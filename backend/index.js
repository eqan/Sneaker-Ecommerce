const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Product')
const cors = require('cors')
const app = express()
const serverAddress = 3001

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://eqan1:pass123@cluster0.zk2im.mongodb.net/ecommerce?retryWrites=true&w=majority")

app.get("/users", (req, res) => {
    UserModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.get(`/products`, (req, res) => {
  const {limit, offset} = req.query;
    ProductModel.find({limit: limit, skip: offset}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.post('/user', async(req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

app.post('/product', async(req, res) => {
    const post = req.body;
    const newProduct = new ProductModel(post);
    await newProduct.save();
    res.json(post);
})

app.listen(serverAddress, () => {
    console.log(`Server running on port ${serverAddress}`);
  });