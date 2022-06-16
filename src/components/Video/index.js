import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Select from 'react-select';
import YouTube from "react-youtube";
import styles from "./styles.module.css";

export default function VideoList({ children, data = {} }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [vidItem, setvidItem] = useState({});
  const vidOptions = [];

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

  data.items.map( ( item, index ) => {
    vidOptions.push( { value: index, label: item.snippet.title } )
  } );

  function changeItem(i) {
    setvidItem(i);
    window.location.href = `#${i.value}`;
  }

  const opts = {
    playerVars: {
      rel: 0,
      modestbranding: 1,
      listType: "playlist",
      list: data.items[itemIndex].snippet.playlistId,
    },
  };

  return (
    <main>
      <Select
        className={styles.selectClass}
        options={vidOptions}
        onChange={changeItem}
        defaultValue={{ label: `${data.items[itemIndex].snippet.title}`, value: 0 }}
      />
      {children}
      <div>
        <YouTube
          className={styles.video}
          iframeClassName={styles.videoResponsive}
          videoId={data.items[itemIndex].snippet.resourceId.videoId}
          opts={opts}
        />
      </div>
    </main>
  );
}
