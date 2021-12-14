const {Router} = require('express');
const customerController = require('../../controller/customerDetails/details.controller');
const routerCustomer = Router();

routerCustomer.get('/:id',  customerController.findCustomer);
routerCustomer.post('/:id',  customerController.createCustomer);

module.exports = routerCustomer;