import React from "react";
import "./Header.css";

export default function Header() {

  return (
    <div className="header">
      <div className="header__title">
        <h3>Shooooort</h3>
      </div>
      <div className="header__subtitle">
        <h5>The Link shortener with a long name</h5>
      </div>
    </div>
  );
}
