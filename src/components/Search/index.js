import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Search() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return <div>API key {customFields.algoliaApiKey}!</div>;
}
