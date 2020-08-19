import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import App from "./containers/App";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import items from "./reducers/items.js";
const store = createStore(combineReducers({ items }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
