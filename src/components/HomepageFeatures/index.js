import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from "@docusaurus/useBaseUrl";
import tafsirJson from "../../../content/tafsir.json";
import videocount from "../../../content/videocount.json";
import VideoIcon from "@site/static/svg/tv-solid.svg";
import YoutubeIcon from "@site/static/svg/youtube-brands.svg";
import Link from "@docusaurus/Link";

function Feature({ image, title, nav, content, index }) {
  const {colorMode, setColorMode} = useColorMode();

  return (
    <div className={clsx("col col--6")}>
      <div className={styles.sectionContainer}>
        <div className={styles.cardContainer}>
          <img src={useBaseUrl("/img/sections/" + image)} />
          <div className={styles.textCol}>
            <Link to={`/videos/${nav}/${content[0].nav}`}>
              <h3 className={styles.sectionTitle}>{title}</h3>
            </Link>
            <ul>
              {content.map(
                (item, index) =>
                  ("playlistid" in item || "content" in item) && (

                    <li key={index + 1000}>
                      <span style={{ marginLeft: '5px' }}>
                        <YoutubeIcon
                          title="Youtube video"
                          className="videoIconClass"
                          width="14px"
                          fill={colorMode === 'dark' ?  '#4dbf4d' : '#853934'}
                        />
                      </span>
                      <Link
                        to={
                          "playlistid" in item
                            ? `/videos/${nav}/${item.nav}`
                            : "type" in item
                            ? `/videos/${nav}/${item.nav}/${item.content[0].title}`
                            : `/videos/${nav}/${item.nav}/${item.content[0].nav}`
                        }
                      >
                        {item.nav}
                      </Link>
                    </li>
                  )
              )}
            </ul>
            <div className={styles.bottomLabel}>
              <VideoIcon
                title="video count"
                className="videoIconClass"
                width="12px"
                fill={colorMode === 'dark' ?  '#4dbf4d' : '#853934'}
              /> {videocount.count[index]} تسجيلات
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {tafsirJson.content.map((props, idx) => (
            <Feature key={idx} {...props} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
