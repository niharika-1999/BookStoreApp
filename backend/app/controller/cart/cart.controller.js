/**
 * @file            : cart.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */

const cartService = require('../../service/cart/cart.service');
const logger = require("../../../config/logger");

class cartController { 
    /**
   * @description to get the items in the cart
   * @param {Object} req 
   * @param {Object} res 
   * @returns data or erro
   */
getCartItems = async (req, res) => {
    const userId=req.body.userId;
    try {
        const data = await cartService.getCart(userId);
        return res.send(data)
    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).send("Something went wrong");
    }
};

/**
   * @description to add an item to the cart
   * @param {Object} req 
   * @param {Object} res 
   * @returns data or error
   */
addCartItem = async (req, res) => {
    const userId=req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    try {
        const data = await cartService.addToCart(userId, productId, quantity);
        return res.status(201).send(data);

    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).send("Something went wrong");
    }
};

 /**
   * @description to delete an item from the cart
   * @param {Object} req 
   * @param {Object} res 
   * @returns data or error
   */

deleteItem = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.params.itemId;
    try {
        let cart = await cartService.deleteProduct(userId, productId);
        return res.status(201).send(cart);

    } catch (err) {
        console.log(err);
        logger.error(err);
        res.status(500).send("Something went wrong");
    }
};

 /**
   * @description to delete an entire cart
   * @param {Object} req 
   * @param {Object} res 
   * @returns data or error
   */

deleteCart = async (req, res) => {
    const userId = req.body.userId;
    try {
      let cart = await cartService.deleteCart(userId);
      return res.status(201).send(cart);
    } catch (err) {
      console.log(err);
      logger.error(err);
      res.status(500).send("Something went wrong");
    }
  };
}
module.exports = new cartController();