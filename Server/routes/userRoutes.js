const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtValidation = require("../Middleware");

router.get("/", jwtValidation, userController.getUserData);
router.post("/edit", jwtValidation, userController.editUserData);

module.exports = router;
