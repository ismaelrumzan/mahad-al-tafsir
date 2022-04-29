require("dotenv").config();

const _ = require("lodash");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
console.log(YOUTUBE_API_KEY);
const youtube = google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });
const contentDirectory = path.join(process.cwd(), "content");
const lessonsDirectory = path.join(process.cwd(), "content/lessons");
const quranDirectory = path.join(process.cwd(), "content/quran");

let tafsirdata = fs.readFileSync(
  path.join(contentDirectory, "tafsir.json"),
  "utf8"
);
let tafsirjson = JSON.parse(tafsirdata);

const getPlaylist = async (params) => {
  const { id } = params;
  nextPageToken = "";
  let result = [];
  totalCount = 4;
  for (let i = 1; i <= totalCount; i++) {
    const res = await youtube.playlistItems.list({
      part: ["snippet,contentDetails"],
      maxResults: 50,
      playlistId: id,
      pageToken: nextPageToken,
    });
    result.push(...res.data.items);
    if (res.data.pageInfo.totalResults < res.data.pageInfo.resultsPerPage * i) {
      break;
    } else {
      nextPageToken = res.data.nextPageToken;
    }
  }
  return result;
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getAllItems = async (obj) => {
  let currentName = "";
  let currentid = "";
  let currentType = "";
  let currentNav = "";
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      await getAllItems(obj[k]);
    } else {
      // base case, stop recurring
      if (k === "id") {
        currentid = obj[k];
      }
      if (k === "title") {
        currentName = obj[k];
      }
      if (k === "type") {
        currentType = obj[k];
      }
      if (k === "nav") {
        currentNav = obj[k];
      }
      if (k === "playlistid" && obj[k] !== "") {
        console.log(currentid + ":" + currentNav + ":" + obj[k]);
        let playlistData = {};
        let verseJson = {};
        if (currentType === "tafsir") {
          const surahNo = currentid.split("_")[2];
          let verseData = fs.readFileSync(
            path.join(quranDirectory, surahNo + ".json")
          );
          verseJson = JSON.parse(verseData);
        }
        playlistData.items = await getPlaylist({ id: obj[k] });
        playlistData.title = currentName;
        playlistData.nav = currentNav;
        playlistData.id = currentid;
        if (Object.keys(verseJson).length > 0) {
          playlistData.verses = verseJson;
          playlistData.type = "tafsir";
        }
        fs.writeFile(
          path.join(lessonsDirectory, currentid + ".json"),
          JSON.stringify(playlistData, null, 4),
          "utf8",
          function (err) {
            if (err) throw err;
          }
        );
        await sleep(10000);
      }
    }
  }
};

const testPlaylist = async () => {
  fsExtra.emptyDirSync(lessonsDirectory);
  playlistData = await getPlaylist({
    id: "PLQ3tuFIYeuXDovl1AzbJjqOcT7JVCntQ8",
  });
};

//testPlaylist();
fse.emptyDirSync(lessonsDirectory);
getAllItems(tafsirjson);
