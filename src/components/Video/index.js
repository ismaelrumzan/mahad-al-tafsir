import React, { useState, useEffect } from "react";
import { YouTube } from "mdx-embed";
import styles from "./styles.module.css";

export default function VideoList({ children, data = {} }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [vidItem, setvidItem] = useState({});
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
    <main>
      <h2>{`${Number(itemIndex) + 1} من ${data.items.length}: ${data.items[
        itemIndex
      ].snippet.title
        .replace(/[0-9]/g, "")
        .replace(/\./g, "")
        .replace(/\_/g, "")}`}</h2>
      {children}
      <div className="container">
        <div className={styles.mainVidContainer}>
          <YouTube
            youTubeId={data.items[itemIndex].snippet.resourceId.videoId}
          />
        </div>

        <div className={styles.videoNavContainer}>
          <div className={styles.videoNav}>
            <div>
              {Number(itemIndex) < data.items.length - 1 && (
                <div className={styles.nextItem}>
                  <p>التسجيل التالى</p>
                  <div className={styles.vidItem}>
                    <div className={styles.vidThumb}>
                      <a
                        onClick={() =>
                          changeItem(data.items[Number(itemIndex) + 1])
                        }
                        className={styles.btnContainer}
                        href={`#${Number(itemIndex) + 1}`}
                      >
                      <img
                        src={data.items[Number(itemIndex) + 1].snippet.thumbnails.medium.url}
                      />
                      </a>
                    </div>
                    <div className={styles.desc}>
                      <p>
                        {data.items[Number(itemIndex) + 1].snippet.title
                          .replace(/[0-9]/g, "")
                          .replace(/\./g, "")
                          .replace(/\_/g, "")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.listContainer}>
                <p>من {data.items.length} تسجيلات</p>
              </div>

              <div className={styles.arrows}>
                <div className={styles.arrowleft}>
                  <i className="fa fa-chevron-left fa-lg"></i>
                </div>
                <div className={styles.arrowright}>
                  <i className="fa fa-chevron-right fa-lg"></i>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
