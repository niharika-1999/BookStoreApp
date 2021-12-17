/**
 * @file            : book.service.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const { findAllBooks, findBook } = require("../../model/books/book.model");

/**
 * @description to fetch all books from database
 * @returns data
 */
const getBooks = () => {
  return findAllBooks();
};

/**
 * @description to fetch all books from database
 * @returns data
 */
const findABook=(findId)=>{
  return findBook(findId);
};

module.exports = { getBooks, findABook };