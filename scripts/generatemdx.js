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
    introData.push(`## [${item.title}](${encodeURIComponent(item.nav)}/) \n`);
    let data = new Object();
    data.path = "videos/" + item.nav + "/index.mdx";
    data.id = item.id;
    data.import = "../../";
    data.type = "index";
    data.title = item.title;
    data.content = item.content;
    data.root = "videos/" + encodeURIComponent(item.nav) + "/";
    videoData.push(data);
    if ("content" in item) {
      item.content.forEach((lesson, index) => {
        if ("notes" in lesson) {
          if ("playlistid" in lesson) {
            introData.push(
              `### [${lesson.title}](${encodeURIComponent(
                item.nav
              )}/${encodeURIComponent(
                lesson.nav
              )}) <span class='badge badge--secondary'>${lesson.notes}</span>\n`
            );
          } else {
            introData.push(
              "### " +
                lesson.title +
                " <span class='badge badge--secondary'>" +
                lesson.notes +
                "</span>\n"
            );
          }
        } else {
          if ("content" in lesson) {
            if ("type" in lesson && lesson.type === "tafsir") {
              introData.push(
                `### [${lesson.title}](${encodeURIComponent(
                  item.nav
                )}/${encodeURIComponent(lesson.nav)}/${encodeURIComponent(
                  lesson.content[0].title
                )}) \n`
              );
            } else {
              introData.push(`### ${lesson.title} \n`);
            }
          } else {
            introData.push(
              `### [${lesson.title}](${encodeURIComponent(
                item.nav
              )}/${encodeURIComponent(lesson.nav)}) \n`
            );
          }
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
                if ("playlistid" in video) {
                  introData.push(
                    `- [${video.title}](${encodeURIComponent(
                      item.nav
                    )}/${encodeURIComponent(lesson.nav)}/${encodeURIComponent(
                      video.nav
                    )}) <span class='badge badge--secondary'>${
                      video.notes
                    }</span>\n`
                  );
                } else {
                  introData.push(
                    `- ${video.title} <span class='badge badge--secondary'>${video.notes}</span>\n`
                  );
                }
              } else {
                introData.push(
                  `- [${video.title}](${encodeURIComponent(
                    item.nav
                  )}/${encodeURIComponent(lesson.nav)}/${encodeURIComponent(
                    video.nav
                  )}) \n`
                );
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
              data.title = video.title;
              data.section = "true";
              if ("type" in video || video.type === "tafsir") {
                data.tafsir = true;
              } else {
                data.tafsir = false;
              }
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
            data.title = lesson.title;
            data.section = "true";
            if ("type" in lesson || lesson.type === "tafsir") {
              data.tafsir = true;
            } else {
              data.tafsir = false;
            }
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
  let searchjson = [];
  let data = "---";
  data += "\n";
  data += "sidebar_position: 1";
  data += "\n";
  data += "---";
  data += "\n";
  playlistData.introData.forEach((item) => {
    data += item;
  });
  await fse.outputFile(
    path.join(videoDir + "تدريس اللغة العربية.mdx"),
    data,
    "utf8"
  );
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
    if ("type" in item && item.type === "index") {
      let data = "# " + item.title;
      data += "\n";
      item.content.forEach((content) => {
        if ("playlistid" in content) {
          data += `## [${content.title}](${encodeURIComponent(content.nav)})`;
          data += "\n";
        } else if ("content" in content) {
          if ("type" in content && content.type === "tafsir") {
            data += `## [${content.title}](${encodeURIComponent(
              content.nav
            )}/${encodeURIComponent(content.content[0].title)})`;
            data += "\n";
          } else {
            data += `## [${content.title}](${encodeURIComponent(
              content.nav
            )}/${encodeURIComponent(content.content[0].nav)})`;
            data += "\n";
          }
        }
      });
      await fse.outputFile(path.join(process.cwd(), item.path), data, "utf8");
    } else {
      const lesson = getLesson(item.id);
      let searchrec = new Object();
      videoCount[Number(item.id.split("_")[0]) - 1] += lesson.items.length;
      let data = "---";
      data += "\n";
      data += "sidebar_position: " + count.toString();
      data += "\n";
      data += "---";
      data += "\n";
      data += `import VideoList from '${item.import}src/components/Video';`;
      data += "\n";
      data += `import videoData from '${item.import}content/lessons/${item.id}.json';`;
      data += "\n";
      data += "\n";
      data += "<VideoList data={videoData}/>";
      data += "\n";
      count += 1;
      searchrec.id = item.id;
      searchrec.title = item.title;
      searchrec.description = "";
      searchrec.path =
        "https://tafsir.institute/" + item.path.replace(".mdx", "");
      let cats = item.path.split("/");
      cats.pop();
      cats.shift();
      searchrec.categories = cats;
      if ("section" in item) {
        searchrec.section = item.section;
        lesson.items.forEach((lessonitem, itemindex) => {
          const itemTitle = lessonitem.snippet.title
            .replace(/[0-9]/g, "")
            .replace(/\./g, "")
            .replace(/\_/g, "");
          if (itemTitle !== "Private video") {
            if (item.tafsir === false) {
              searchrec.description += itemTitle + " ";
            }
            searchrecitem = new Object();
            searchrecitem.id = item.id + "_" + itemindex;
            searchrecitem.title = itemTitle.trim();
            searchrecitem.description = "";
            if (itemindex !== 0) {
              searchrecitem.path =
                "https://tafsir.institute/" +
                item.path.replace(".mdx", "") +
                "#" +
                itemindex;
            } else {
              searchrecitem.path =
                "https://tafsir.institute/" + item.path.replace(".mdx", "");
            }
            if ("medium" in lessonitem.snippet.thumbnails) {
              searchrecitem.image = lessonitem.snippet.thumbnails.medium.url;
            }
            searchrecitem.section = false;
            searchrecitem.categories = cats;
            searchjson.push(searchrecitem);
          }
        });
        searchrec.image = lesson.items[0].snippet.thumbnails.medium.url;
      }
      if ("tafsir" in item) {
        searchrec.tafsir = item.tafsir;
      }
      searchjson.push(searchrec);
      await fse.outputFile(path.join(process.cwd(), item.path), data, "utf8");
    }
  });
  let videoCountObj = new Object();
  videoCountObj.count = videoCount;
  await fse.outputFile(
    path.join(contentDirectory + "/videocount.json"),
    JSON.stringify(videoCountObj, null, 4),
    "utf8"
  );
  await fse.outputFile(
    path.join(contentDirectory + "/search.json"),
    JSON.stringify(searchjson, null, 4),
    "utf8"
  );
}

fse.emptyDirSync(videoDir);
createMDX();
