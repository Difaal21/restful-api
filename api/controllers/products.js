const Products = require("../models/products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find().select("name price type").exec();

    if (products === null) {
      return res.status(404).json({
        message: `Please create a new product`,
      });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    let product = await Products.findById(req.params.productId)
      .select("name type price")
      .exec();

    if (product === null) {
      return res.status(404).json({
        message: `Product does'nt exist`,
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: `Invalid ID`,
    });
  }
};

exports.createOneProduct = async (req, res, next) => {
  const product = new Products({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
  });

  try {
    const saveProduct = await product.save();

    const newProduct = await Products.findById(saveProduct._id)
      .select("name type price")
      .exec();

    res
      .status(201)
      .json({ produk: newProduct, status: "Success to add produk" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOneProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId)
      .select("name type price")
      .exec();

    if (product === null) {
      return res.status(404).json({ message: `Failed to delete product` });
    }

    product.remove();

    res.status(200).json({
      message: `${product.name} has been deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Invalid ID`,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const newProduct = await Products.updateOne(
      { _id: req.params.productId },
      { $set: req.body }
    ).exec();

    const product = await Products.findById(req.params.productId)
      .select("name type price")
      .exec();

    if (product === null) {
      return res.status(404).json({
        message: `Can't update product`,
      });
    }

    res.status(201).json({ produk: product, status: "Success to update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
