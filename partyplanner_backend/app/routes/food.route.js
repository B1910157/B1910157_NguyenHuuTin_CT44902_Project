const express = require("express");

const food = require("../controllers/food.controller");


const router = express.Router();

router.route("/")
    .get(food.findAll)
    .post(food.create)
    .delete(food.deleteAll);



router.route("/:id")
    .get(food.findOne)
    .put(food.update)
    .delete(food.delete);


module.exports = router;