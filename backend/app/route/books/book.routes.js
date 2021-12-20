/**
 * @file            : book.routes.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
 const express = require('express');
 const routerBook = express.Router();
 const bookController = require('../../controller/books/book.controller');
const {ensureToken} = require('../../middleware/cart.middleware');

 //to fetch all books
routerBook.get('/',ensureToken, bookController.findAll);

// to find all books based on search key
routerBook.post("/search", ensureToken, bookController.searchBook);

// to sort books 
routerBook.post("/sort", ensureToken, bookController.sortBook);

// finds all book based on page index
routerBook.get("/:index", ensureToken ,bookController.booksPagination);

module.exports = routerBook;
