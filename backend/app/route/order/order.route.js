const {Router} = require('express');
const orderController = require('../../controller/order/order.controller');
const routerOrder = Router();
const {ensureToken} = require('../../middleware/cart.middleware');


routerOrder.get('/',  ensureToken, orderController.getOrderItems);
routerOrder.post('/',  ensureToken, orderController.addOrderItem);

module.exports = routerOrder;