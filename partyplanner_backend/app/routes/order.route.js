const express = require("express");

const order = require("../controllers/user.controller");
// const service = require("../controllers/serviceProvider.controller")




const router = express.Router();

router.route("/")
    .get(order.findAllOrdersOfUser)
    .post(order.addOrder)

router.route("/cancelOrder/:orderId")
    .get(order.cancelOrderUser)

router.route("/getOrder")
    .get(order.getOrderUnconfirm)
    
    // .delete(order.deleteAll)

router.route("/:id")
    // .get(service.findOneService)
    .get(order.findOneOrder)
  
    

module.exports = router;