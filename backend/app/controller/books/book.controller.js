/**
 * @file            : book.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */

/**
 * @description to get all the books from the database
 * @param {Object} req 
 * @param {Object} res 
 */
 const {getBooks, search, sort, pagination}=require("../../service/books/book.service");
 exports.findAll = (req, res) => {
     getBooks().then(books => {
         res.send(books);
     }).catch(err => {
         return res.send(err)
 });}

 /**
 * @description the request and response for searching books
 * @param {Object} req
 * @param {Object} res
 */
exports.searchBook = async (req, res) => {
    try {
      let data = await search(req.body.searchText);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  
  /**
   * @description the request and response to sort the books
   * @param {Object} req
   * @param {Object} res
   */
  exports.sortBook = async (req, res) => {
    try {
      let data = await sort(req.body.descending);
      return res.status(200).send(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).send(error);
    }
  };
  
  /**
   * @description request and response for setting 12 books per page
   * @param {Object} req
   * @param {Object} res
   */
  exports.booksPagination = async (req, res) => {
    try {
      const data = await pagination(req.params.index);
      return res.send(data);
    } catch (err) {
      logger.error("Could not find book", err);
      return res.send(err);
    }
  };