const ProductModel = require('../models/Product')
require('dotenv').config();

exports.getProduct = function (req, res) {
  const { id } = req.query;
  ProductModel.find({ _id: id }, (err, result) => {
    if (err) {
      return res.status(404).send({ message: "Product not found!" });
    } else {
      return res.json(result);
    }
  });
}

exports.getProducts = function (req, res) {
  const { limit, offset } = req.query;
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).limit(limit).skip(offset);
}

exports.deleteProduct = async function (req, res) {
  const { id } = req.query;
  try {
    await ProductModel.deleteOne({ _id: id });
    res.send(200, "Product removed")
  }
  catch (error) {
    return res.status(404).send({ message: "Product not found!" });
  }
}

exports.updateProduct = async function (req, res) {
  const { id } = req.query;
  const update = req.body;
  try {
    const newProduct = await ProductModel.findOneAndUpdate(id, update, {
      new: true
    });
    console.log(newProduct)
    res.json(newProduct)
  }
  catch (error) {
    return res.status(404).send({ message: "Product not found!" });
  }
}

exports.createProducts = async function (req, res) {
  const products = req.body;
  products.map(async (product) => {
    product._id = getNextSequenceValue('productid')
    console.log(product)
    try {
      const newProduct = await ProductModel.create(product)
      console.log(newProduct, "product");
      res.json(product);
    }
    catch (error) {
      res.send(errorCode, "Product already added")
    }
  })
}

exports.createProduct = async function (req, res) {
  let product = req.body;
  product._id = getNextSequenceValue('productid')
  try {
    const newProduct = await ProductModel.create(product)
    console.log(newProduct)
    res.json(newProduct)
  }
  catch (error) {
    return res.status(409).send({ message: "Product already added!" });
  }
};