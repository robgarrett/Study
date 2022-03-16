/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Hello from "./components/Hello/hello";

const root = document.getElementById("root");
// eslint-disable-next-line no-unused-expressions
root ? ReactDOM.render(<Hello />, root) : false;
