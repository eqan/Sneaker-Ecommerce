const ProductModel = require('../models/Product')

var successCode = 200;
var errorCode = 500;

app.get("/product", (req, res) => {
    const {id} = req.query;
    ProductModel.find({_id: id}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

app.get(`/products`, (req, res) => {
  const {limit, offset} = req.query;
  console.log(limit)
    ProductModel.find({limit: limit, skip: offset}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });

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