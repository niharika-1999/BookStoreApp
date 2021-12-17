/**
 * @file            : book.routes.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 */
const express = require('express');
const routerBook = express.Router();
const books = require('../../controller/books/book.controller');
routerBook.get('/', books.findAll);
module.exports = routerBook;