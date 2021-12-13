import { getBooks } from "../helper/axios";

export const getAllBooks = () => {
    let url = "http://localhost:4000/books"
    return getBooks(url).then((response) => {
        return response;
    }).catch((err) => {
        throw err;
    });
};