const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Product')
const cors = require('cors')
const app = express()
const serverAddress = 3001

app.use(express.json())
app.use(cors())

var errorCode = 500;
var successCode = 200;

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

app.get("/user", (req, res) => {
    const {id} = req.query;
    UserModel.find({_id: id}, (err, result) => {
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
    try
    {
      await newUser.save();
      res.json(user);
    }
    catch(error)
    {
      res.send(errorCode, "User already added!")
    }
})

app.post('/product', async(req, res) => {
    const product = req.body;
    try
    {
      const newProduct= await ProductModel.create(product)
      console.log(newProduct)
      res.json(newProduct)
    }
    catch(error)
    {
      res.send(errorCode, "Product already added")
    }
})

app.delete('/product', async(req, res) => {
    const {id} = req.query;
    try
    {
      await ProductModel.deleteOne({ _id: id });
      res.send(successCode, "Product removed")
    }
    catch(error)
    {
      res.send(errorCode, "Product not removed")
    }
})

app.put('/product', async(req, res) => {
    const {id} = req.query;
    const update = req.body;
    try
    {
      const newProduct = await ProductModel.findOneAndUpdate(id, update, {
        new: true
      });
      console.log(newProduct)
      res.json(newProduct)
    }
    catch(error)
    {
      res.send(errorCode, "Product not updated")
    }
})

app.post('/products', async(req, res) => {
    const products = req.body;
    products.map( async(product) => {
      console.log(product)
      try
      {
        const newProduct= await ProductModel.create(product)
        console.log(newProduct,"product");
        res.json(product);
      }
      catch(error)
      {
        res.send(errorCode, "Product already added")
      }
    })
})

app.listen(serverAddress, () => {
    console.log(`Server running on port ${serverAddress}`);
  });