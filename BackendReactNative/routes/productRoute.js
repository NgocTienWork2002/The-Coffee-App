const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", productController.getProduct);
router.get("/home", productController.getProductHome);
router.get("/category", productController.getProductByCategory);
router.get("/:id", productController.getProductDetail);
router.post("/add", productController.addProduct);

module.exports = router;
