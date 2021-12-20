/**
 * @file            : cart.service.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
 const Cart = require("../../model/cart/cart.model");
 const { findABook, updateQuantity  } = require("../books/book.service");
 const logger = require("../../../config/logger");
 
 class cartService {
   /**
    * @description to fetch the cart
    * @param {Object} userId 
    * @returns data or error
    */
   getCart = async (userId) => {
     let cart;
     try {
       cart = await Cart.find({ userId: userId });
     } catch (err) {
       logger.error(err);
     }
     if (cart && cart[0].items.length > 0) {
       return cart;
     } else {
       return null;
     }
   };
 
   /**
    * @description to add an item to the cart
    * @param {Object} userId 
    * @param {Object} productId 
    * @param {Object} quantity 
    * @returns data or error
    */
   addToCart = async (userId, productId, quantity) => {
     let item;
     let cart;
     try {
       cart = await Cart.find({ userId: userId });
     } catch (err) {
        logger.error(err);
       console.log(err);
     }
     try {
       item = await findABook(productId);
     } catch (err) {
       logger.error(err);
       return "Item not found";
     }
 
     const price = item.price;
     const name = item.title;
     const author = item.author;
     const image = item.image;
     updateQuantity(productId,quantity)
     .then()
     .catch(e => console.log(e));
     if (cart.length != 0) {
       // if cart exists for the user
       let itemIndex = cart[0].items.findIndex((p) => p.productId == productId);
       // Check if product exists or not
       if (itemIndex > -1) {
         let productItem = cart[0].items[itemIndex];
         productItem.quantity += quantity;
         cart[0].items[itemIndex] = productItem;
       } else {
         cart[0].items.push({
           productId,
           name,
           author,
           quantity,
           price,
           image,
         });
       }
       cart[0].bill += quantity * price;
       cart[0] = cart[0].save();
       return cart[0];
     } else {
       // no cart exists, create one
       const newCart = Cart.create({
         userId,
         items: [
           {
             productId,
             name,
             author,
             quantity,
             price,
             image,
           },
         ],
         bill: quantity * price,
       });
       return newCart;
     }
   };
 
   /**
    * @description to delete an item from the cart
    * @param {Object} userId 
    * @param {Object} productId
    * @returns data or error
    */
   deleteProduct = async (userId, productId) => {
     let cart;
     try {
       cart = await Cart.find({ userId: userId });
     } catch (err) {
         logger.error(err);
     }
     let itemIndex = cart[0].items.findIndex((p) => p.productId == productId);
     if (itemIndex > -1) {
       let productItem = cart[0].items[itemIndex];
       cart[0].bill -= productItem.quantity * productItem.price;
       cart[0].items.splice(itemIndex, 1);
       updateQuantity(productId,-productItem.quantity).then().catch(e=>console.log(e));
     }
     cart = await cart[0].save();
     return cart;
   };
   
   deleteCart= async(userId) => {
     let cart;
     try {
         cart = await Cart.find({userId: userId});
     } catch (err) {
         console.log(err);
         logger.error(err);
     }
     await cart[0].delete();
     return ("Successfully deleted")
   };
 }
 module.exports = new cartService();