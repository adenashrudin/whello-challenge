import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { useDataLayerValue } from "../../state-provider/DataLayer";

export default function Form() {
  const [url, setUrl] = useState("");
  const [{}, dispatch] = useDataLayerValue();

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
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    e.preventDefault();
    const shortCode = makeShortCode(6);
    const data = {
      url: url,
      shortcode: shortCode,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("/shorten", data, headers)
      .then((res) => {
        localStorage.setItem(shortCode, url);

        dispatch({
          type: "SET_LOADING",
          loading: false,
        });

        dispatch({
          type: "SET_CODE",
          codeNewInput: shortCode,
        });

        setTimeout(() => {
          setUrl("");
        }, 1000);
      })
      .catch((err) => {
        window.alert(err);
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
