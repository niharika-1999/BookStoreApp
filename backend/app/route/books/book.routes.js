const express = require('express');
const routerBook = express.Router();
const books = require('../../controller/books/book.controller');
routerBook.get('/', books.findAll);
module.exports = routerBook;