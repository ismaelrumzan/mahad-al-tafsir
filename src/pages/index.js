import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Search from "@site/src/components/Search";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.tagline}
        </h1>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/videos/جميع دورات النحو/مبادئ  دروس العربية"
          >
            ابدأ هنا
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/videos/تدريس اللغة العربية"
          >
            خطة تدريس
          </Link>
        </div>

        <h2 className={clsx("hero__subtitle", styles.heroSubTitle)}>
          دروس لتأسيس وبناء طالب العلم في العلوم الشرعية عامة ،وعلم التفسير خاصة
        </h2>
        <div className={styles.searchContainer}>
          <Search initialValue="ابحث عن التسجيلات أو استكشف أدناه" />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <HomepageHeader />
      <div className={styles.homeContent}>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
