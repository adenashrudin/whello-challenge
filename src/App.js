import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import From from "./components/Form/Form";
import History from "./components/History/HistoryLink";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <From />
        <History />
      </div>
    </div>
  );
}

export default App;
