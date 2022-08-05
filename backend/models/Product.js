const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }]
});

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;