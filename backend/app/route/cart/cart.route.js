/**
 * @file            : cart.route.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const {Router} = require('express');
const cartController = require('../../controller/cart/cart.controller');
const routerCart = Router();
const {ensureToken} = require('../../middleware/cart.middleware');

//to get all the cart items
routerCart.get('/', ensureToken, cartController.getCartItems);

//to add an cart item to database
routerCart.post('/', ensureToken, cartController.addCartItem);

//to delete an item in the cart
routerCart.delete('/:itemId', ensureToken, cartController.deleteItem);

//to delete a cart
routerCart.delete('/', ensureToken, cartController.deleteCart);

module.exports = routerCart;