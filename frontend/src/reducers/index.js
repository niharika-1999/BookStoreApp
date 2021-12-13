import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";

const myReducer = combineReducers({
  allBooks: booksReducer, 
});
export default myReducer;