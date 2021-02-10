import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

export default function Form() {
  const [url, setUrl] = useState("");

  function makeShortCode(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const shorCode = makeShortCode(6);
    const data = {
      url: url,
      shortcode: shorCode,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("/shorten", data, headers)
      .then((res) => {
        localStorage.setItem(shorCode, url);
        setUrl("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="link__shorter">
      <input
        type="text"
        className="link__shorter__input"
        value={url}
        onChange={(val) => {
          return setUrl(val.target.value);
        }}
      />
      <button disabled={!url} className="link__shorter__button" type="submit">
        Shorter this link
      </button>
    </form>
  );
}
