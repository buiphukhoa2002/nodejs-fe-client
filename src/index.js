import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/configStore";
import App from "./App";

// Import multiple languages
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
