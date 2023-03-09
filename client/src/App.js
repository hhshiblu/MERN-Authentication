import React from "react";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Component from "./Component";
import ("./App.css")
function App() {
  return (
    <BrowserRouter>
  <Component/>
    </BrowserRouter>
  );
}

export default App;
