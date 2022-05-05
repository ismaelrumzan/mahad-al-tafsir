# Deploy a collection of Youtube playlists as a static site

## Problem
We had collection of close to 2000 videos (still growing) organized in a specific structure of folders and sub-folders. We needed to make them available for students and people interested in this content in a way that is searchable, easy to navigate and also free from distraction. 

## Solution
We tried the following and went through several iterations:
- AWS S3 for hosting the videos - easy to synch the local folder structure with remote but financially not sustainable for the project
- Youtube for hosting the videos and navigating - cannot customize the navigation and search 
- Youtube for hosting and `Next.js` for navigation/search - good initial solution that worked as alpha launch
- Youtube for hosting and `Docusaurus 2` for navigation/search - launched as beta version as the built-in features of Docusaurus reduced the need for several custom components that would otherwise need to be built
 
## Techologies used

- [Next.js](https://nextjs.org)
- [Docusaurus 2](https://docusaurus.io/), a modern static website generator - beta version (current)
- [Vercel](https://vercel.com), for hosting the static site - alpha and beta versions
- [Youtube](https://youtube.com), for hosting the videos and using the API to get the playlist content
- [Node](https://nodejs.org/), for writing the scripts to synch the videos and generate the static content from the video structure

### How-to guide
