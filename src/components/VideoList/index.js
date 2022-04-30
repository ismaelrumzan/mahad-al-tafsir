import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { YouTube } from "mdx-embed";

export default function VideoList({ children, list = [], data = {} }) {
  const [vidItem, setvidItem] = useState({});
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    if ("hash" in window.location && window.location.hash !== "") {
      setItemIndex(window.location.hash.replace("#", ""));
    }
  }, [vidItem]);
  data.items.sort((a, b) => {
    const orderNoArrayA = a.snippet.title.split(" ")[0].split(".");
    const orderNoArrayB = b.snippet.title.split(" ")[0].split(".");
    const orderNoA = Number(orderNoArrayA[orderNoArrayA.length - 1]);
    const orderNoB = Number(orderNoArrayB[orderNoArrayB.length - 1]);
    if (orderNoA < orderNoB) {
      return -1;
    } else {
      return 1;
    }
  });
  function changeItem(i) {
    setvidItem(i);
  }
  return (
    <div>
      <h2>{`${Number(itemIndex) + 1} من ${list.length}: ${list[itemIndex].title
        .replace(/[0-9]/g, "")
        .replace(/\./g, "")
        .replace(/\_/g, "")}`}</h2>
      {list.length > 0 && (
        <div className={styles.container}>
          <div className={styles.video}>
            <YouTube youTubeId={list[itemIndex].id} />
          </div>
          <div className={styles.videoNav}>
            <h3>Next Up</h3>
            <a
              onClick={() => changeItem(list[Number(itemIndex) + 1])}
              className={styles.btnContainer}
              href={`#${Number(itemIndex) + 1}`}
            >
              <img
                className={styles.backgroundimage}
                src={
                  data.items[Number(itemIndex) + 1].snippet.thumbnails.medium
                    .url
                }
              />
              <div className={styles.overlay}>
                <img src={useBaseUrl("/img/ic_play.png")} />
                <p>{data.items[Number(itemIndex) + 1].snippet.title}</p>
              </div>
            </a>

            <h3>From {list.length} videos</h3>
            <div className="dropdown dropdown--hoverable">
              <button className="button button--primary">Choose a Video</button>
              <ul className="dropdown__menu">
                {list.map((item, index) => (
                  <li onClick={() => changeItem(item)} key={index}>
                    <a className="dropdown__link" href={`#${index}`}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
