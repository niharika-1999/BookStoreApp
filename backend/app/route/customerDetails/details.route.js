/**
 * @file            : details.routes.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const {Router} = require('express');
const customerController = require('../../controller/customerDetails/details.controller');
const routerCustomer = Router();
const {ensureToken} = require('../../middleware/cart.middleware');

//to find a customer detail
routerCustomer.get('/', ensureToken, customerController.findCustomer);

//to get a new customer detail
routerCustomer.post('/', ensureToken, customerController.createCustomer);

module.exports = routerCustomer;