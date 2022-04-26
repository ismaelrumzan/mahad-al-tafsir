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
  onBrokenLinks: "throw",
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
          path: "lessons",
          routeBasePath: "lessons",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "quran",
        path: "quran",
        routeBasePath: "quran",
        sidebarPath: require.resolve("./sidebars.js"),
        // ... other options
      },
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
            label: "الدروس التأسيسية",
          },
          {
            type: "doc",
            docsPluginId: "quran",
            docId: "surahs",
            position: "left",
            label: "تفسير تحليلي",
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
