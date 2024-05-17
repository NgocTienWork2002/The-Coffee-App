const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/", orderController.getOrderList);
router.post("/", orderController.handleOrder);
router.get("/:id", orderController.getOrderByUserID);
router.get("/detail/:id", orderController.getOrderDetail);

module.exports = router;
