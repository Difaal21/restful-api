const express = require("express"),
  router = express.Router();

const ProductController = require("../controllers/products");

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductsById);

router.post("/", ProductController.createOneProduct);

router.patch("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.deleteOneProduct);

module.exports = router;
