// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "معهد التفسير",
          src: "img/logo.jpeg",
        },
        items: [
          {
            type: "doc",
            docId: "تدريس",
            position: "left",
            label: "التسجيلات الصوتية",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Lessons",
            items: [
              {
                label: "Get Started",
                to: "/lessons/تدريس",
              },
            ],
          },
          {
            title: "Tafsir",
            items: [
              {
                label: "List of Surahs",
                to: "/quran/surahs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tafsir Institute.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
