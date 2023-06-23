const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgot_password);
router.post("/reset-password", authController.reset_password);

module.exports = router;
