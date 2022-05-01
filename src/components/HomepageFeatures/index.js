import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import tafsirJson from "../../../content/tafsir.json";
import Link from "@docusaurus/Link";

function Feature({ image, title, nav, content }) {
  return (
    <div className={clsx("col col--6")}>
      <div className={styles.sectionContainer}>
        <Link to={`/videos/${nav}/${content[0].nav}`}>
          <h3 className={styles.sectionTitle}>{title}</h3>
        </Link>
        <div className={styles.cardContainer}>
          <div className={styles.textCol}>
            <p>{content.map((item) => item.title).join(" | ")}</p>
            <div className={styles.bottomLabel}>--- التسجيلات</div>
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
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
