import { getBooks,searchBooks } from "../helper/axios";
import { getToken } from "../utils/userTokens";
const token = getToken();

export const getAllBooks = () => {
    let url = "http://localhost:4000/books";
    return getBooks(url, `bearer ${token}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };
  
  export const searchABook = (data) => {
    let url = "http://localhost:4000/books/search";
    return searchBooks(url,data,`bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
  };
  
  export const sortBooks = (data) => {
    let url = "http://localhost:4000/books/sort"
    return searchBooks(url,data,`bearer ${token}`).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
  }