import React from "react";
import "./HistoryLink.css";

export default function HistoryLink() {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="container__history">
      <div className="header__history">
        <h2 className="header__history__title">Previously shortened by you</h2>
        <p className="header__history__action" onClick={handleClick}>
          Clear History
        </p>
      </div>
      <div className="container__history__table">
        <table>
          <thead>
            <tr>
              <td>LINK</td>
              <td>VISITS</td>
              <td>LAST VISITED</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="short__link">
                  shooorter.com/<span>1c16af</span>
                </p>
                <p className="original__link">https:/instagram.com</p>
              </td>
              <td>1140</td>
              <td>2 days ago</td>
            </tr>
            <tr>
              <td>
                <p className="short__link">
                  shooorter.com/<span>1c16af</span>
                </p>
                <p className="original__link">https:/instagram.com</p>
              </td>
              <td>1140</td>
              <td>2 days ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
