import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { YouTube } from "mdx-embed";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function VideoList({ children, data = {} }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [vidItem, setvidItem] = useState({});
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const currentVid = useRef(null);
  const executeScroll = () => currentVid.current.scrollIntoView();
  useEffect(() => {
    if ("hash" in window.location && window.location.hash !== "") {
      setItemIndex(window.location.hash.replace("#", ""));
    }
  }, [vidItem]);
  const handleResize = () => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  useEffect(() => {
    if (height !== ref.current.offsetHeight) {
      setHeight(ref.current.offsetHeight);
      executeScroll();
    }
  });
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
        <div className="row">
          <div className="col col--9">
            <div ref={ref}>
              <YouTube
                youTubeId={data.items[itemIndex].snippet.resourceId.videoId}
              />
            </div>
          </div>
          <div className="col col--3">
            <div
              className={styles.vidListContainer}
              style={{
                height: `${height}px`,
              }}
            >
              <div className={styles.vidList}>
                {data.items.map((item, index) => (
                  <div
                    className={styles.vidItem}
                    key={index}
                    ref={Number(itemIndex) === index ? currentVid : null}
                  >
                    <div className={styles.thumb}>
                      <a
                        onClick={() => changeItem(data.items[Number(index)])}
                        href={`#${Number(index)}`}
                        className={styles.btnContainer}
                      >
                        {"medium" in item.snippet.thumbnails && (
                          <img
                            className={
                              Number(itemIndex) === index
                                ? styles.vidItemDown
                                : styles.vidItemUp
                            }
                            src={item.snippet.thumbnails.medium.url}
                            alt=""
                          />
                        )}

                        <div className={styles.overlay}>
                          <p>
                            {" "}
                            {item.snippet.title
                              .replace(/[0-9]/g, "")
                              .replace(/\./g, "")
                              .replace(/\_/g, "")}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
