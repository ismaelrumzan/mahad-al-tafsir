import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import tafsirJson from "../../../content/tafsir.json";
import videocount from "../../../content/videocount.json";
import Link from "@docusaurus/Link";

function Feature({ image, title, nav, content, index }) {
  return (
    <div className={clsx("col col--6")}>
      <div className={styles.sectionContainer}>
        <Link to={`/videos/${nav}/${content[0].nav}`}>
          <h3 className={styles.sectionTitle}>{title}</h3>
        </Link>
        <div className={styles.cardContainer}>
          <div className={styles.textCol}>
            <p>
              {content.map(
                (item) =>
                  ("playlistid" in item || "content" in item) && (
                    <span>
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
                      </Link>{" "}
                      |{" "}
                    </span>
                  )
              )}
            </p>
            <div className={styles.bottomLabel}>
              {videocount.count[index]} تسجيلات
            </div>
          </div>
          <img src={useBaseUrl("/img/sections/" + image)} />
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
