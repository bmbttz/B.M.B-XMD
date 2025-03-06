const { adams } = require("../Ibrahim/adams");
const axios = require('axios');
const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');

// Command for downloading audio (MP3)
adams({
  nomCom: "play",  // Changed to a unique command name
  aliases: ["song", "audio", "mp3"],
  categorie: "Search",
  reaction: "🎵"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  // Check if a query is provided
  if (!arg[0]) {
    return repondre("Please provide a video name.");
  }

  const query = arg.join(" ");

  try {
    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (!searchResults || !searchResults.videos.length) {
      return repondre('No video found for the specified query.');
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Send a fast response to indicate downloading
    const fastResponse = {
      text: `*BMB XMD is downloading ${firstVideo.title}*`,
      contextInfo: {
        externalAdReply: {
          title: firstVideo.title,
          body: "𝙱.𝙼.𝙱-𝚇𝙼𝙳 downloader",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/6p6jkb.jpg",
          sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    };
    await zk.sendMessage(dest, fastResponse, { quoted: ms });

    // Using ytdl-core to download the audio directly
    const stream = ytdl(videoUrl, { filter: 'audioonly' });

    // Send audio file
    const audioPayload = {
      audio: { url: stream },
      mimetype: 'audio/mp4',
      contextInfo: {
        externalAdReply: {
          title: firstVideo.title,
          body: `🎶 ${firstVideo.title} | Download complete`,
          mediaType: 1,
          sourceUrl: 'https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24',
          thumbnailUrl: firstVideo.thumbnail,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };

    // Send the downloaded audio to the user
    await zk.sendMessage(dest, audioPayload, { quoted: ms });

  } catch (error) {
    console.error('Error during download process:', error.message);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});


// Command for downloading video (MP4)
adams({
  nomCom: "video",  // Changed to a unique command name
  aliases: ["vide", "mp4"],
  categorie: "Search",
  reaction: "🎬"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  // Check if a query is provided
  if (!arg[0]) {
    return repondre("Please provide a video name.");
  }

  const query = arg.join(" ");

  try {
    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (!searchResults || !searchResults.videos.length) {
      return repondre('No video found for the specified query.');
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Send a fast response to indicate downloading
    const fastResponse = {
      text: `*BMB XMD is downloading ${firstVideo.title}*`,
      contextInfo: {
        externalAdReply: {
          title: firstVideo.title,
          body: "𝙱.𝙼.𝙱-𝚇𝙼𝙳 downloader",
          mediaType: 1,
          thumbnailUrl: firstVideo.thumbnail,
          sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };
    await zk.sendMessage(dest, fastResponse, { quoted: ms });

    // Using ytdl-core to download the video directly
    const stream = ytdl(videoUrl, { format: 'mp4' });

    // Send video file
    const videoPayload = {
      video: { url: stream },
      mimetype: 'video/mp4',
      contextInfo: {
        externalAdReply: {
          title: firstVideo.title,
          body: `🎬 ${firstVideo.title} | Download complete`,
          mediaType: 2,
          sourceUrl: 'https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24',
          thumbnailUrl: firstVideo.thumbnail,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };

    // Send the downloaded video to the user
    await zk.sendMessage(dest, videoPayload, { quoted: ms });

  } catch (error) {
    console.error('Error during download process:', error.message);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});
