const orderService = require("../../service/order/order.service");
const logger = require('../../../config/logger');

class orderController {
getOrderItems = async (req, res) => {
    const userId=req.body.id;
    try {
        const data = await orderService.getOrder(userId);
        return res.send(data)
    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).send("Something went wrong");
    }
};

addOrderItem = async (req, res) => {
    const userId=req.body.userId;
    console.log(userId)
    try {
        const data = await orderService.addToOrder(userId);
        return res.status(201).send(data);
    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).send("Something went wrong");
    }
};
}
module.exports = new orderController();