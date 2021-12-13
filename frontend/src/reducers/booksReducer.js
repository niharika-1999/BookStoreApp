import { ActionTypes } from "../constants/booksConstants";
const intialState = {
  books: [],
  searchedBooks: [],
  currentPage: 1,
};

function sortDescendingOrder(array, field) {
  return array.sort(function (a, b) {
    if (a[field] > b[field]) {
      return -1;
    }
    if (b[field] > a[field]) {
      return 1;
    }
    return 0;
  });
}
function sortAscendingOrder(array, field) {
  return array.sort(function (a, b) {
    if (a[field] > b[field]) {
      return 1;
    }
    if (b[field] > a[field]) {
      return -1;
    }
    return 0;
  });
}

export const booksReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: payload };
    case ActionTypes.SET_SEARCHED_BOOKS:
      return { ...state, searchedBooks: payload };
    case ActionTypes.SORT_BY_PRICE:
      let sortedArray;
      switch (payload) {
        case "asc":
          sortedArray = sortAscendingOrder(state.searchedBooks, "price");
          break;
        case "desc":
          sortedArray = sortDescendingOrder(state.searchedBooks, "price");
          break;
        default:
          sortedArray = state.books;
          break;
      }
      return {
        ...state,
        searchedBooks: sortedArray,
      };
    case ActionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return state;
  }
};