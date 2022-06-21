import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Select from 'react-select';
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
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

  const opts = {
    playerVars: {
      rel: 0,
      modestbranding: 1,
      listType: "playlist",
      list: data.items[itemIndex].snippet.playlistId,
    },
  };

  function changeItem(i) {
    setvidItem(i);
    window.location.href = `#${i.value}`;
  }

  function changeItemNav( i, direction ) {
    let num = 0;
    direction === 'forward' ? num = data.items.indexOf(i) + 1 : num = data.items.indexOf(i) - 1;

    if ( num >= 0 && num !== null && num !== undefined ) {
      setvidItem(num);
      setItemIndex(num);
      window.location.href = `#${num}`;
    }
  }

  return (
    <main>
      <div className={styles.navContainer}>
        <div className={styles.selectContainer}>
          <Select
            className={styles.selectClass}
            options={vidOptions}
            onChange={changeItem}
            defaultValue={{ label: `${data.items[itemIndex].snippet.title}`, value: 0 }}
          />
        </div>
        <div className={styles.faContainer}>
          <FontAwesomeIcon
            size="2x"
            icon={faCaretRight}
            onClick={() => changeItemNav(data.items[itemIndex], 'forward')}
          />
          <FontAwesomeIcon
            size="2x"
            icon={faCaretLeft}
            onClick={() => changeItemNav(data.items[itemIndex], 'back')}
          />
        </div>
      </div>
      <div className={styles.vidContainer}>
        {children}
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
