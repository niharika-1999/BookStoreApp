const { findAllBooks } = require("../../model/books/book.model");

const getBooks = () => {
  return findAllBooks();
};
module.exports = { getBooks };