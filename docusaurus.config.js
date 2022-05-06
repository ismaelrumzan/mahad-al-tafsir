// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require("dotenv").config();
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "معهد التفسير",
  tagline: "التسجيلات الصوتية للشيخ علي هاني العقرباوي",
  url: "https://tafsir.institute",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "ismaelrumzan", // Usually your GitHub org/user name.
  projectName: "mahad-al-tafsir", // Usually your repo name.
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "videos",
          routeBasePath: "videos",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  i18n: {
    defaultLocale: "ar",
    locales: ["ar"],
  },
  customFields: {
    // Put your custom environment here
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaApiKey: process.env.ALGOLIA_API_KEY,
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      autoCollapseSidebarCategories: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 2,
      },
      navbar: {
        logo: {
          alt: "معهد التفسير",
          src: "img/logo.jpeg",
        },
        items: [
          {
            type: "doc",
            docId: "تدريس اللغة العربية",
            position: "left",
            label: "التسجيلات الصوتية",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `حقوق النشر © ${new Date().getFullYear()} معهد تفسير`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
