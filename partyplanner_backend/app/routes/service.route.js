const express = require("express");
const service = require("../controllers/serviceProvider.controller");

const router = express.Router();

router.route("/register").post(service.create);
router.route("/login").post(service.login);
router.route("/logout").post(service.logout);


module.exports = router;