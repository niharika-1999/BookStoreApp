/**
 * @file            : order.service.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const logger = require('../../../config/logger');
const Order = require('../../model/order/order.model');
const { getCart } = require('../cart/cart.service');
const { getcustomer } = require('../customerDetails/details.service');

class orderService {
/**
 * @description to fetch a particular order
 * @param {Object} userId 
 * @returns 
 */
    getOrder = async (userId) => {
        let order;
        try {
            order = await Order.find({ userId: userId });
        } catch (err) {
            logger.error(err);
            console.log(err);
        }
        if (order && order[0].items.length > 0) {
            return order;
        } else {
            return null;
        }
    };

/**
 * @description to add order in the database
 * @param {Object} userId 
 * @returns 
 */

    addToOrder = async (userId) => {
        let cart;
        let customerAddress;
        try {
            customerAddress = await getcustomer(userId);
        } catch (err) {
            logger.error(err);
            console.log(err);
        }
        try {
            cart = await getCart(userId);


        } catch (err) {

            return ("Cart is empty");
        }
        const newOrder = Order.create({
            userId: userId,
            customerId: customerAddress[0]._id,
            items: cart[0].items,
            bill: cart[0].bill,
            status: "dispatched"
        });
        return newOrder;
    };
}
module.exports = new orderService();