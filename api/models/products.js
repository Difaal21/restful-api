const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  type:{
    type: "String",
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
