import { ActionTypes } from "../constants/booksConstants";
const intialState = {
  books: [],
  searchedBooks: [],
  currentPage: 1,
  cartContents: [],
  orderId: "",
};

export const booksReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: payload };
    case ActionTypes.SET_SEARCHED_BOOKS:
      return { ...state, searchedBooks: payload };
    case ActionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case ActionTypes.SET_CART:
      return {
        ...state,
        cartContents: payload,
      };
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartContents: [...state.cartContents, payload],
      };
    case ActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cartContents: state.cartContents.filter(
          (item) => item.productId !== payload
        ),
      };
    case ActionTypes.ORDER_ID:
      return {
        ...state,
        orderId: payload,
      };
    default:
      return state;
  }
};