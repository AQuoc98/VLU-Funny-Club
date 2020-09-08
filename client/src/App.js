// 3rd packages
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "./App.css";

// Import root app
import AppRoot from "./containers/App/Index";

function App() {
  return (
    <Router>
      <AppRoot></AppRoot>
    </Router>
  );
}

export default App;
