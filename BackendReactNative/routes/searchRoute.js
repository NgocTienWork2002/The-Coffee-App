const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", productController.searchProduct);
router.post("/cart", productController.getProductListCart);

module.exports = router;
