const express = require("express");
const router = express.Router();

const promoController = require("../controller/promoController");

router.get("/", promoController.getPromo);
router.post("/add", promoController.addPromo);

module.exports = router;
