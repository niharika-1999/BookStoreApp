const {Router} = require('express');
const cartController = require('../../controller/cart/cart.controller');
const routerCart = Router();
const {ensureToken} = require('../../middleware/cart.middleware');

routerCart.get('/', ensureToken, cartController.getCartItems);
routerCart.post('/', ensureToken, cartController.addCartItem);
routerCart.delete('/:itemId', ensureToken, cartController.deleteItem);
routerCart.delete('/', ensureToken, cartController.deleteCart);

module.exports = routerCart;