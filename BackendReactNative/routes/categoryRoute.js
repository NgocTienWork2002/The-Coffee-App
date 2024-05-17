const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getCategoryDetail);
router.post("/create", categoryController.createCategory);

module.exports = router;
