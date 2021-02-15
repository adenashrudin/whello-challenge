import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HistoryLink.css";
import moment from "moment";
import CopyToClipboard from "react-copy-to-clipboard";
import ReactLoading from "react-loading";
import { useDataLayerValue } from "../../state-provider/DataLayer";

export default function HistoryLink() {
  const [{ loading }, dispatch] = useDataLayerValue();
  const [datas, setData] = useState([]);
  const [isHover, setIsHover] = useState({});

  const handleClick = () => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });

    localStorage.clear();

    setTimeout(() => {
      dispatch({
        type: "SET_LOADING",
        loading: false,
      });
    }, 200);
  };

  useEffect(() => {
    async function getData() {
      let tempData = [];
      let tempUrl = [];

      dispatch({
        type: "SET_LOADING",
        loading: true,
      });

      for (let [key, value] of Object.entries(localStorage)) {
        tempUrl.push({
          url: value,
          key: key,
        });
      }
      await axios
        .all(tempUrl.map((l) => axios.get(`${l.key}/stats`)))
        .then(
          axios.spread((...response) => {
            response.map((res, index) =>
              tempData.push({
                shortCode: tempUrl[index].key,
                url: tempUrl[index].url,
                startDate: res.data.startDate,
                redirectCount: res.data.redirectCount,
                lastSeenDate: res.data.lastSeenDate,
              })
            );
            dispatch({
              type: "SET_LOADING",
              loading: false,
            });
          })
        )
        .catch((err) => {
          window.alert(err);
        });
      tempData = tempData.sort((a, b) => {
        return new moment(b.startDate) - new moment(a.startDate);
      });
      return setData(tempData);
    }

    if (localStorage.length != 0) {
      getData();
    } else {
      setData([]);
    }
  }, [localStorage.length]);

  const cutChar = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleMouseHover = (index) => {
    setIsHover({ ...isHover, [index]: true });
  };

  const handleMouseLeave = (index) => {
    setIsHover({ ...isHover, [index]: false });
  };

  return (
    <div className="container__history">
      {loading ? (
        <ReactLoading
          className="loading"
          type="cubes"
          color="#eb4a42"
          height={"10%"}
          width={"10%"}
        />
      ) : (
        <>
          <div className="header__history">
            <h2 className="header__history__title">
              Previously shortened by you
            </h2>
            <p className="header__history__action" onClick={handleClick}>
              Clear History
            </p>
          </div>
          <div className="container__history__table">
            <table className="table__main">
              <thead>
                <tr>
                  <td className="thead__left">LINK</td>
                  <td
                    className="thead__right"
                    align="right"
                    style={{ paddingRight: "40px" }}
                  >
                    VISITS
                  </td>
                  <td className="thead__right" align="center">
                    LAST VISITED
                  </td>
                </tr>
              </thead>
              <tbody>
                {datas.length > 0 ? (
                  datas.map((data, index) => {
                    return (
                      <tr key={data.shortCode}>
                        <td
                          className={`thead__left short__link__container ${
                            index === 0 ? "border" : ""
                          }`}
                          align="left"
                        >
                          <div
                            className="short__link"
                            onMouseEnter={() => handleMouseHover(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                          >
                            <CopyToClipboard
                              text={`https://impraise-shorty.herokuapp.com/${data.shortCode}`}
                            >
                              <span>
                                <p>
                                  https://impraise-shorty.herokuapp.com/
                                  <span>{data.shortCode}</span>
                                </p>
                              </span>
                            </CopyToClipboard>
                            {isHover[index] && (
                              <p className="copy__link">
                                Click to copy this link
                              </p>
                            )}
                          </div>
                          <p className="original__link">
                            {cutChar(data.url, 100)}
                          </p>
                        </td>
                        <td align="right" style={{ paddingRight: "40px" }}>
                          {data.redirectCount}
                        </td>
                        <td align="center">
                          {data.redirectCount > 0
                            ? moment(
                                moment(data.lastSeenDate).format()
                              ).fromNow()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="no_data" style={{ textAlign: "center" }}>
                    <td colSpan="3">No Data Record</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
