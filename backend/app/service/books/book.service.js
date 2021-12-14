const { findAllBooks, findBook } = require("../../model/books/book.model");

const getBooks = () => {
  return findAllBooks();
};

const findABook=(findId)=>{
  return findBook(findId);
};

module.exports = { getBooks, findABook };