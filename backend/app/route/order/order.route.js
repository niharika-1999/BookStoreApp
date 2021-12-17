/**
 * @file            : order.route.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const {Router} = require('express');
const orderController = require('../../controller/order/order.controller');
const routerOrder = Router();
const {ensureToken} = require('../../middleware/cart.middleware');

//to get the ordered item
routerOrder.get('/',  ensureToken, orderController.getOrderItems);

// to add a new order
routerOrder.post('/',  ensureToken, orderController.addOrderItem);

module.exports = routerOrder;