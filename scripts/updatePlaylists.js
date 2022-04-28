require("dotenv").config();

const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

const getLists = async () => {
  const res = await youtube.playlists.list({
    part: "id,snippet,status",
    channelId: "UCCJ6xD0brwMP8hAq2TTDOSA",
    maxResults: 50,
  });
  console.log(res.data);
};

getLists();

//update tafsir.json to match all items in pdf curriculum and don't include playlist ids if not available = one time task
//get all playlists from channel - paginate if needed
//check if all playlists exist in tafsir.json
//for those that don't exist compare the title and add id to relevant
//get all videos for each new playlist
//update any json files
//create mdx files
//build
