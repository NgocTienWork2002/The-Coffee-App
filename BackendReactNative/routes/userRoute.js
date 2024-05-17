const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/", userController.getUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.getUserDetail);

module.exports = router;
