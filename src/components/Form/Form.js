import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
const apiUrl = "/";

export default function Form() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlData = {
      url: url,
      shortcode: "x6f7a1",
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(apiUrl, urlData, headers)
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
