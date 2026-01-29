import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { CartReducer } from "./reducer/CartReducer";

const root = combineReducers({
  CartReducer,
});

const middleware = [thunk];

const Store = createStore(
  root,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;