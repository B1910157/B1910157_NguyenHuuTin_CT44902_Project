const express = require("express");

const service = require("../controllers/serviceProvider.controller");


const router = express.Router();

router.route("/")
    .get(service.findAllService)

router.route("/:serviceId")
    .get(service.findOneService)
   

module.exports = router;