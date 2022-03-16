import React, { Component } from "react";
import ReactDOM from "react-dom";

import Hello from "./components/Hello/hello";

const root = document.getElementById("root");
root ? ReactDOM.render(<Hello />, root) : false;

export default App;