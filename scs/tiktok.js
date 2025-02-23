/**const { adams } = require("../Ibrahim/adams");
const axios = require('axios');

// Hardcoded API Configurations
const BaseUrl = 'https://apis.ibrahimadams.us.kg';
const adamsapikey = 'ibraah-tech';

// Validate Config
function validateConfig() {
  if (!BaseUrl || !adamsapikey) {
    throw new Error("Configuration error: Missing BaseUrl or API key.");
  }
}
validateConfig();

// Helper Function: Fetch Buffer
async function fetchBuffer(url) {
  try {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(data, 'binary');
  } catch (error) {
    console.error('Buffer Fetch Error:', error.message);
    throw new Error('Failed to fetch media. Please try again.');
  }
}

// TikTok Media Downloader
async function fetchTikTokMedia(url) {
  try {
    const endpoint = `${BaseUrl}/api/download/tiktok?apikey=${adamsapikey}&url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(endpoint);

    if (data.status !== 200 || !data.success) {
      throw new Error(data.message || 'API Error');
    }

    return { video: data.result.video, audio: data.result.audio };
  } catch (error) {
    console.error('TikTok API Error:', error.message);
    throw new Error('Failed to download TikTok video or audio.');
  }
}

// WhatsApp Command Integration
adams({
  nomCom: "tikt",
  categorie: "Download",
  reaction: "🌍"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0] || !arg[0].startsWith("https://")) {
    return repondre("Please provide a valid TikTok URL.");
  }
  

  try {
    const tiktokUrl = arg[0];
    const media = await fetchTikTokMedia(tiktokUrl);

    // Fetch video and audio buffers
    const videoBuffer = await fetchBuffer(media.video);
    const audioBuffer = await fetchBuffer(media.audio);

    // Send video
    await zk.sendMessage(dest, {
      video: videoBuffer,
      mimetype: 'video/mp4',
      caption: `> Your TikTok video is ready!`
    }, { quoted: ms });

    // Send audio
    await zk.sendMessage(dest, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      ptt: false // Set to true if you want to send it as a voice note
    }, { quoted: ms });

    await repondre("✅ Media sent successfully!");

  } catch (error) {
    console.error('TikTok Command Error:', error.message);
    repondre("An error occurred while processing your request. Please try again.");
  }
*/







const { adams } = require("../Ibrahim/adams");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const yts = require("yt-search");
const { exec } = require("child_process");

// Command Handler
adams({
  nomCom: "find",
  categorie: "Utility",
  reaction: "🔍"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, quotedMessage } = commandeOptions;

  // Ensure the command is a reply to a media file (audio or video)
  if (!quotedMessage || !(quotedMessage.message?.videoMessage || quotedMessage.message?.audioMessage)) {
    return repondre("Please reply to a video or audio with this command.");
  }

  try {
    // Detect video or audio in the replied message
    const mediaMessage = quotedMessage.message.videoMessage || quotedMessage.message.audioMessage;

    // Download the media file
    const mediaBuffer = await zk.downloadMediaMessage(quotedMessage);
    const tempFilePath = `./temp_media_${Date.now()}.tmp`;

    // Save the media to a temporary file
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Extract media information using ffmpeg
    ffmpeg.ffprobe(tempFilePath, async (err, metadata) => {
      if (err) {
        console.error("FFprobe Error:", err.message);
        return repondre("Failed to extract media information. Please try again.");
      }

      // Parse metadata
      const format = metadata.format;
      const duration = Math.floor(format.duration / 60) + "m " + Math.floor(format.duration % 60) + "s";
      const query = format.tags?.title || "Unknown Media";

      // Search for the song/video on YouTube
      const searchResults = await yts(query);
      const video = searchResults.videos[0]; // Get the first video result

      const mediaInfo = `
        *Media Information:*
        🎵 Title: ${video?.title || "Unknown"}
        👤 Owner: ${video?.author.name || "Unknown"}
        ⏱️ Duration: ${duration}
        📂 File Name: ${format.filename || "Unknown"}
        📄 Format: ${format.format_name} (${format.format_long_name})
        📦 Size: ${(format.size / (1024 * 1024)).toFixed(2)} MB
        🌐 YouTube URL: ${video?.url || "Not Found"}
      `.trim();

      await zk.sendMessage(dest, { text: mediaInfo }, { quoted: ms });

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);
    });
  } catch (error) {
    console.error("Find Command Error:", error.message);
    repondre("An error occurred while processing your request. Please try again.");
  }
});
