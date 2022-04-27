import React, { useState, useEffect } from "react";
import { YouTube } from "mdx-embed";
export default function VideoList({ children, list = [] }) {
  const [vidItem, setvidItem] = useState({});
  const [itemIndex, setItemIndex] = useState(0);
  useEffect(() => {
    if ("hash" in window.location && window.location.hash !== "") {
      setItemIndex(window.location.hash.replace("#", ""));
    }
  }, [vidItem]);

  function changeItem(i) {
    setvidItem(i);
  }
  return (
    <div>
      {list.length > 0 && (
        <>
          <h2>{`${Number(itemIndex) + 1} من ${list.length}: ${list[
            itemIndex
          ].title
            .replace(/[0-9]/g, "")
            .replace(/\./g, "")
            .replace(/\_/g, "")}`}</h2>
          <div>
            <a
              className={
                Number(itemIndex) === 0
                  ? `button disabled button--primary`
                  : `button button--primary`
              }
              href={`#${Number(itemIndex) - 1}`}
              onClick={() => changeItem(list[Number(itemIndex) - 1])}
            >
              Previous Video
            </a>
            <div className="dropdown dropdown--hoverable">
              <button className="button button--primary">Select Video</button>
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
            <a
              className={
                Number(itemIndex) === list.length - 1
                  ? `button disabled button--primary`
                  : `button button--primary`
              }
              href={`#${Number(itemIndex) + 1}`}
              onClick={() => changeItem(list[Number(itemIndex) + 1])}
            >
              Next Video
            </a>
          </div>

          <div>
            <YouTube youTubeId={list[itemIndex].id} />
          </div>
        </>
      )}
    </div>
  );
}
