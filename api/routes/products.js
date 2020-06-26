const express = require("express"),
  router = express.Router();

const Auth = require("../middleware/auth");

const ProductController = require("../controllers/products");

router.get("/", ProductController.getAllProducts);

router.get("/:productId", ProductController.getProductsById);

router.post("/", Auth, ProductController.createOneProduct);

router.patch("/:productId", Auth, ProductController.updateProduct);

router.delete("/:productId", Auth, ProductController.deleteOneProduct);

module.exports = router;
