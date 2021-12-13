import { createStore } from "redux";
import myReducer from "./reducers/index";

const myStore = createStore(
  myReducer,{},  
);

export default myStore;
