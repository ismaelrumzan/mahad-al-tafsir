// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tafsir Institute',
  tagline: 'Learn the art of tafsir',
  url: 'https://tafsir.institute',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ismaelrumzan', // Usually your GitHub org/user name.
  projectName: 'mahad-al-tafsir', // Usually your repo name.
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path:'lessons',
          routeBasePath: 'lessons',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'quran',
        path: 'quran',
        routeBasePath: 'quran',
        sidebarPath: require.resolve('./sidebars.js'),
        // ... other options
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Tafsir Institute',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'تدريس',
            position: 'left',
            label: 'Lessons',
          },
          {
            type: 'doc',
            docsPluginId: 'quran',
            docId: 'surahs',
            position: 'left',
            label: 'Tafsir',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Lessons',
            items: [
              {
                label: 'Get Started',
                to: '/lessons/تدريس',
              },
            ],
          },
          {
            title: 'Tafsir',
            items: [
              {
                label: 'List of Surahs',
                to: '/quran/surahs',
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
