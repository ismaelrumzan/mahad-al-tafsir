const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const contentDirectory = path.join(process.cwd(), "content");
const lessonsDirectory = path.join(process.cwd(), "content/lessons");

const videoPath = "videos/";
const videoDir = path.join(process.cwd(), videoPath);
const lessonPath = "lessons/";

function getPlaylistData() {
  let videoData = [];
  let categories = [];
  let introData = [];
  let lessonData = [];
  const fileName = "tafsir.json";
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const tafsirjson = JSON.parse(fileContents);
  tafsirjson.content.forEach((item) => {
    videoCount = 0;
    let mypath;
    let category = new Object();
    category.data = new Object();
    category.data.label = item.nav;
    category.data.position = Number(item.id);
    category.path = videoPath + item.nav;
    categories.push(category);
    introData.push("- " + item.title + "\n");
    if ("content" in item) {
      item.content.forEach((lesson, index) => {
        if ("notes" in lesson) {
          introData.push("  - " + lesson.title + " (" + lesson.notes + ")\n");
        } else {
          introData.push("  - " + lesson.title + "\n");
        }
        if ("content" in lesson) {
          mypath = videoPath + item.nav + "/" + lesson.nav + "/";
          let category = new Object();
          category.data = new Object();
          category.data.label = lesson.nav;
          category.data.position = index + 1;
          category.path = mypath;
          categories.push(category);
          lesson.content.forEach((video) => {
            if ("type" in video === false || video.type !== "tafsir") {
              if ("notes" in video) {
                introData.push(
                  "    - " + video.title + " (" + video.notes + ")\n"
                );
              } else {
                introData.push("    - " + video.title + "\n");
              }
            }
            if ("playlistid" in video) {
              let data = new Object();
              if ("nav" in video) {
                data.path = mypath + video.nav + ".mdx";
              } else {
                data.path = mypath + video.title + ".mdx";
              }
              data.id = video.id;
              data.import = "../../../";
              videoData.push(data);
            }
          });
        } else {
          if ("playlistid" in lesson) {
            mypath = videoPath + item.nav + "/";
            let data = new Object();
            data.path = mypath + lesson.nav + ".mdx";
            data.id = lesson.id;
            data.import = "../../";
            videoData.push(data);
          }
        }
      });
    }
  });
  return { videos: videoData, categories: categories, introData: introData };
}

function getLesson(fileid) {
  const fileName = fileid + ".json";
  const fullPath = path.join(lessonsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  let tafsirjson = JSON.parse(fileContents);
  tafsirjson.items.sort((a, b) => {
    const orderNoArrayA = a.snippet.title.split(" ")[0].split(".");
    const orderNoArrayB = b.snippet.title.split(" ")[0].split(".");
    const orderNoA = Number(orderNoArrayA[orderNoArrayA.length - 1]);
    const orderNoB = Number(orderNoArrayB[orderNoArrayB.length - 1]);
    if (orderNoA < orderNoB) {
      return -1;
    } else {
      return 1;
    }
  });
  return tafsirjson;
}

async function createMDX() {
  const playlistData = getPlaylistData();
  let data = "---";
  data += "\n";
  data += "sidebar_position: 1";
  data += "\n";
  data += "---";
  data += "\n";
  playlistData.introData.forEach((item) => {
    data += item;
  });
  await fse.outputFile(path.join(videoDir + "تدريس.mdx"), data, "utf8");
  playlistData.categories.forEach(async (item) => {
    await fse.outputFile(
      path.join(item.path + "/_category_.json"),
      JSON.stringify(item.data, null, 4),
      "utf8"
    );
  });
  let count = 1;
  let videoCount = [0, 0, 0, 0, 0];
  playlistData.videos.forEach(async (item) => {
    const lesson = getLesson(item.id);
    videoCount[Number(item.id.split("_")[0]) - 1] += lesson.items.length;
    let data = "---";
    data += "\n";
    data += "sidebar_position: " + count.toString();
    data += "\n";
    data += "---";
    data += "\n";
    data += `import VideoList from '${item.import}src/components/VideoList';`;
    data += "\n";
    data += `import videoData from '${item.import}content/lessons/${item.id}.json';`;
    data += "\n";
    data += "\n";
    data += "<VideoList data={videoData}/>";
    data += "\n";
    count += 1;
    await fse.outputFile(path.join(process.cwd(), item.path), data, "utf8");
  });
  let videoCountObj = new Object();
  videoCountObj.count = videoCount;
  await fse.outputFile(
    path.join(contentDirectory + "/videocount.json"),
    JSON.stringify(videoCountObj, null, 4),
    "utf8"
  );
}

fse.emptyDirSync(videoDir);
createMDX();
