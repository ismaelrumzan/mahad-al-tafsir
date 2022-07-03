import React from "react";
import { Player, BigPlayButton } from "video-react";
import loaderLight from "@site/static/img/loader_light.png";
import loaderDark from "@site/static/img/loader_dark.png";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";

export function VideoPlayer({ id }) {
  const { colorMode, setColorMode } = useColorMode();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const [data, setData] = React.useState(null);
  const [isError, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    try {
      fetch(
        `https://mahad-al-tafsir.herokuapp.com/getYT?id=${id}&key=${customFields.YTKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    } catch (err) {
      setError(true);
    }
  }, [id]);

  if (isError) return <div>failed to load video</div>;

  if (!data || isLoading) {
    return colorMode === "dark" ? (
      <img src={loaderDark} />
    ) : (
      <img src={loaderLight} />
    );
  }

  return <Player src={data.data[0].url} />;
}
