import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import * as classes from "./styles"

ReactDOM.render(
  <div className={classes.root}>
    <App />
  </div>,
  document.getElementById("root")
);
