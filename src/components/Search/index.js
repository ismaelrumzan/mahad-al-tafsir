import React, { createElement } from "react";
import PropTypes from "prop-types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
  Configure,
  connectHighlight,
} from "react-instantsearch-dom";
import getAlgoliaClient from "../../../lib/getalgolia";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

export default function Search({ initialValue = "", filters = [] }) {
  const searchClient = getAlgoliaClient();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <div className={styles.searchWrapper}>
      <InstantSearch
        indexName={customFields.algoliaIndex}
        searchClient={searchClient}
      >
        <CustomSearchBox placeholder={initialValue} />
        <CustomHits />
        {filters === [] ? (
          <Configure hitsPerPage={20} />
        ) : (
          <Configure hitsPerPage={20} tagFilters={filters} />
        )}
      </InstantSearch>
    </div>
  );
}

function Hits({ hits = [] }) {
  if (hits.length === 0) {
    return <div />;
  }
  return (
    <div className={styles.searchResultsContainer}>
      {hits.map((res) => (
        <Link
          to={res.path.replace("https://tafsir.institute", "")}
          key={res.id}
        >
          <div className={styles.searchResItemContainer}>
            <div className={styles.searchResTitle}>{res.title}</div>
            {res.description !== "" && (
              <div className={styles.searchResDesc}>{res.description}</div>
            )}
            {res.categories.length > 0 && (
              <div className={styles.taglineSearch}>
                {res.categories.map((cat, index) => (
                  <span class="badge badge--info" key={`${res.id}_${index}`}>
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

const CustomHits = connectHits(Hits);

function SearchBox({
  currentRefinement,
  isSearchStalled,
  refine,
  placeholder,
}) {
  function handleChange(e) {
    refine(e.target.value);
  }

  return (
    <input
      placeholder={placeholder}
      value={currentRefinement}
      onChange={(event) => handleChange(event)}
      className={styles.searchBox}
      type="search"
    />
  );
}

const CustomSearchBox = connectSearchBox(SearchBox);

function Highlight({
  highlight,
  attribute,
  hit,
  highlightProperty = "_highlightResult",
}) {
  const parsedHit = highlight({
    highlightProperty,
    attribute,
    hit,
  });

  return (
    <span>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={getUnsafeKey(index)}>{part.value}</mark>
        ) : (
          <span key={getUnsafeKey(index)}>{part.value}</span>
        )
      )}
    </span>
  );
}

Highlight.propTypes = {
  attribute: PropTypes.string,
  highlight: PropTypes.func,
  highlightProperty: PropTypes.string,
  hit: PropTypes.object,
};

const CustomHighlight = connectHighlight(Highlight);
