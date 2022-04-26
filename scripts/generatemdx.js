const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const contentDirectory = path.join(process.cwd(), "content");
const lessonsDirectory = path.join(process.cwd(), "content/lessons");
const mdxDir = path.join(process.cwd(), "mdx");

function getPlaylistData() {
  let lessonData = [];
  let tafsirData = [];
  const fileName = "tafsir.json";
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const tafsirjson = JSON.parse(fileContents);
  tafsirjson.content.forEach((item) => {
    let path;
    if (item.id == "1") {
      item.content.forEach((lesson) => {
        if ("content" in lesson) {
          lesson.content.forEach((sublesson) => {
            if ("content" in sublesson) {
              path = "lessons/" + lesson.title + "/" + sublesson.title + "/";
              sublesson.content.forEach((video) => {
                let data = new Object();
                data.path = path + video.title + ".mdx";
                data.id = video.id;
                data.import = "../../../";
                lessonData.push(data);
              });
            } else {
              path = "lessons/" + lesson.title + "/";
              let data = new Object();
              data.path = path + sublesson.title + ".mdx";
              data.id = sublesson.id;
              data.import = "../../";
              lessonData.push(data);
            }
          });
        }
      });
    }
    if (item.id == "2") {
      item.content.forEach((lesson) => {
        if ("content" in lesson) {
          lesson.content.forEach((sublesson) => {
            if ("content" in sublesson) {
              path = "quran/" + sublesson.title + "/";
              sublesson.content.forEach((video) => {
                let data = new Object();
                data.path = path + video.title + ".mdx";
                data.id = video.id;
                data.import = "../../";
                tafsirData.push(data);
              });
            } else {
              path = "quran/";
              let data = new Object();
              data.path = path + sublesson.title + ".mdx";
              data.id = sublesson.id;
              data.import = "../";
              tafsirData.push(data);
            }
          });
        }
      });
    }
  });
  return { lessons: lessonData, tafsir: tafsirData };
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

function getAllLessonsIds() {
  const fileNames = fs.readdirSync(lessonsDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.json$/, ""),
    };
  });
}

const iterate = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (key == "content") {
      console.log(`key: ${key}, value: ${obj[key]}`);
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterate(obj[key]);
    }
  });
};

async function createMDX() {
  const playlistData = getPlaylistData();
  let count = 1;
  playlistData.tafsir.forEach(async (item) => {
    const lesson = getLesson(item.id);
    let data = "---";
    data += "\n";
    data += "sidebar_position: " + count.toString();
    data += "\n";
    data += "---";
    data += "\n";
    data += "import { YouTube } from 'mdx-embed'";
    data += "\n";
    lesson.items.forEach((item) => {
      if (item.snippet.title !== "Private video") {
        data += "\n";
        data += "## " + item.snippet.title;
        data += "\n";
        data += "<YouTube youTubeId='" + item.contentDetails.videoId + "' />";
        data += "\n";
      }
    });
    count += 1;
    await fse.outputFile(path.join(process.cwd(), item.path), data, "utf8");
  });
}

createMDX();
