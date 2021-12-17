/**
 * @file            : order.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */

const orderService = require("../../service/order/order.service");
const logger = require('../../../config/logger');

class orderController {
/**
 * @description to fetch all the ordered item from the database
 * @param {Object} req 
 * @param {Object} res 
 * @returns data or error
 */
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

/**
 * @description to add an ordered item to the database
 * @param {Object} req 
 * @param {Object} res 
 * @returns data or error
 */
addOrderItem = async (req, res) => {
    const userId=req.body.userId;
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