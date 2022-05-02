import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { YouTube } from "mdx-embed";

export default function VideoList({ children, data = {} }) {
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
      <h2>{`${Number(itemIndex) + 1} من ${data.items.length}: ${data.items[
        itemIndex
      ].snippet.title
        .replace(/[0-9]/g, "")
        .replace(/\./g, "")
        .replace(/\_/g, "")}`}</h2>
      <div className={styles.container}>
        <div className={styles.video}>
          <YouTube
            youTubeId={data.items[itemIndex].snippet.resourceId.videoId}
          />
        </div>
        <div className={styles.videoNav}>
          {Number(itemIndex) < data.items.length - 1 && (
            <>
              <p>التسجيل التالى</p>
              <a
                onClick={() => changeItem(data.items[Number(itemIndex) + 1])}
                className={styles.btnContainer}
                href={`#${Number(itemIndex) + 1}`}
              >
                <img
                  src={
                    data.items[Number(itemIndex) + 1].snippet.thumbnails.medium
                      .url
                  }
                />
                <div className={styles.overlay}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-play"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <p>
                    {data.items[Number(itemIndex) + 1].snippet.title
                      .replace(/[0-9]/g, "")
                      .replace(/\./g, "")
                      .replace(/\_/g, "")}
                  </p>
                </div>
              </a>
            </>
          )}

          <p>من {data.items.length} تسجيلات</p>
          <div
            className={clsx("dropdown dropdown--hoverable", styles.selectBtn)}
          >
            <button
              className={clsx("button button--primary", styles.selectBtn)}
            >
              اختر واحدة
            </button>
            <ul className="dropdown__menu">
              {data.items.map((item, index) => (
                <li onClick={() => changeItem(item)} key={index}>
                  <a className="dropdown__link" href={`#${index}`}>
                    {item.snippet.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
