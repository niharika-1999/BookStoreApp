const cartService = require('../../service/cart/cart.service');
const logger = require("../../../config/logger");

class cartController { 
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