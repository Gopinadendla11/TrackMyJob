const express = require("express");
const router = express.Router();
const controller = require("../controllers/applicationController");
const jwtValidation = require("../Middleware");

router.post("/new", jwtValidation, controller.newApplication);

router.get("/stats", jwtValidation, controller.getStats);

router.get("/", jwtValidation, controller.getApplications);

router.put("/edit", jwtValidation, controller.updateStatus);

router.post("/delete", jwtValidation, controller.deleteApplications);

module.exports = router;
