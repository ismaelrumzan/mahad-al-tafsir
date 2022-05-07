import algoliasearch from "algoliasearch/lite";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function getAlgoliaClient() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const algoliaClient = algoliasearch(
    customFields.algoliaAppId,
    customFields.algoliaApiKey
  );

  return {
    async search(requests) {
      if (requests.every(({ params: { query } }) => Boolean(query) === false)) {
        return {
          results: requests.map(() => {
            return {
              processingTimeMS: 0,
              nbHits: 0,
              hits: [],
              facets: {},
            };
          }),
        };
      }

      return algoliaClient.search(requests);
    },
    async searchForFacetValues(requests) {
      return algoliaClient.searchForFacetValues(requests);
    },
  };
}
