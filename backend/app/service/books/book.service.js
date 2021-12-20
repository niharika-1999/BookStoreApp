/**
 * @file            : book.service.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
 const { findAllBooks, findBook, update, searchBook, sortBooks  } = require("../../model/books/book.model");

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
 
 /**
 * @description to update quantity in database
 * @param {Object} findId 
 * @param {Number} quantity 
 * @returns data
 */
const updateQuantity = (findId,quantity) => {
  return update(findId,quantity);
};

/**
 * @description to search a book
 * @param {String} searchText 
 * @returns data
 */
const search=(searchText)=>{
  return searchBook(searchText);
}

/**
 * @description to sort the books
 * @param {Object} order 
 * @returns data
 */
const sort = (order) => {
  return order==="rel" ? (findAllBooks()) : (sortBooks(order)) ;
};

/**
 * @description To get 12 books in one page
 * @param {Integer} index 
 * @returns data or error
 */
const pagination = async (index) => { 
  let page = parseInt(index);
  page = (page - 1) * 12;
  try {
    const data = await findAllBooks();
    return data.slice(page, page + 12);
  } catch (error) {
    throw error;
  }
};

module.exports = { getBooks, findABook, updateQuantity, search, sort, pagination };
