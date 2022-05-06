import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Search() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return <div>Search Box goes here</div>;
}
