const { adams } = require('../Ibrahim/adams');
const axios = require("axios");
const fs = require('fs');
const { igdl } = require("ruhend-scraper");
const { downloadTiktok } = require('@mrnima/tiktok-downloader');
const { facebook } = require('@mrnima/facebook-downloader');  
const ai = require('unlimited-ai');

adams({
  nomCom: "instagram",
  aliases: ["igdl", "ig", "insta"],
  categorie: "Download",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0] || !arg[0].includes('https://www.instagram.com/')) {
    return repondre('Please provide a valid public Instagram video link!');
  }

  try {
    const downloadData = await igdl(arg[0]);

    if (!downloadData || !downloadData.data || downloadData.data.length === 0) {
      return repondre("No video found at the provided Instagram link.");
    }

    for (let video of downloadData.data) {
      if (video && video.url) {
        await zk.sendMessage(dest, {
          video: { url: video.url },
          mimetype: "video/mp4",
          caption: "*Instagram video by B.M.B XMD*"
        });
      }
    }
  } catch (error) {
    console.error(error);
    repondre("An error occurred while processing the request. Please try again later.");
  }
});

adams({
  nomCom: "tiktok",
  aliases: ["tikdl", "tiktokdl"],
  categorie: "Download",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0] || !arg[0].includes('tiktok.com')) {
    return repondre("Please provide a valid TikTok video link!");
  }

  try {
    const tiktokData = await downloadTiktok(arg[0]);
    const videoLinks = tiktokData.result.dl_link;

    // Send the best-quality video automatically
    await zk.sendMessage(dest, {
      video: { url: videoLinks.download_mp4_2 || videoLinks.download_mp4_1 },
      caption: "*TikTok video by B.M.B XMD*",
    });

    // Send the audio version of the video
    if (videoLinks.download_mp3) {
      await zk.sendMessage(dest, {
        audio: { url: videoLinks.download_mp3 },
        mimetype: "audio/mpeg",
        caption: "*TikTok audio by B.M.B XMD*",
      });
    }
  } catch (error) {
    console.error(error);
    repondre('An error occurred: ' + error.message);
  }
});

adams({
  nomCom: "spotify",
  aliases: ["spotifydl", "splay"],
  categorie: "Download",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0] || !arg[0].includes('https://')) {
    return repondre('Please provide a valid Spotify track link!');
  }

  try {
    const downloadApiUrl = `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(arg[0])}`;
    const response = await axios({
      url: downloadApiUrl,
      method: "GET",
      responseType: "stream",
    });

    // Send the downloaded audio file directly
    if (response.headers["content-type"] === "audio/mpeg") {
      await zk.sendMessage(dest, {
        audio: { stream: response.data },
        mimetype: "audio/mpeg",
      });
    } else {
      repondre("Failed to fetch Spotify audio. Please try again later.");
    }
  } catch (error) {
    repondre(`Error: ${error.message}`);
    console.error(error);
  }
});

adams({
  nomCom: "facebook",
  aliases: ["fbdl", "facebookdl", "fb"],
  categorie: "Download",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0] || !arg[0].includes('https://')) {
    return repondre('Please provide a valid Facebook video link!');
  }

  try {
    const videoData = await facebook(arg[0]);
    const videoLinks = videoData.result.links;

    // Send the best-quality video automatically
    await zk.sendMessage(dest, {
      video: { url: videoLinks.HD || videoLinks.SD },
      caption: "*Facebook video by B.M.B XMD*",
    });
  } catch (error) {
    console.error(error);
    repondre('An error occurred: ' + error.message);
  }
});
adams({
  nomCom: "gpt1",
  aliases: ["gpt4", "ai"],
  reaction: '⚔️',
  categorie: "search"
}, async (context, message, params) => {
  const { repondre, arg } = params;  
  const alpha = arg.join(" ").trim(); 

  if (!alpha) return repondre("Please provide text.");

  let conversationData = [];

  try {
    const rawData = fs.readFileSync('store.json', 'utf8');
    if (rawData) {
      conversationData = JSON.parse(rawData);
      if (!Array.isArray(conversationData)) {
        conversationData = [];
      }
    }
  } catch (err) {
    console.log('No previous conversation found, starting new one.');
  }

  const model = 'gpt-4-turbo-2024-04-09';
  const userMessage = { role: 'user', content: alpha };  
  const systemMessage = { role: 'system', content: 'You are an assistant in WhatsApp. You are called Ibrahim Adams. You respond to user commands.' };

  // Ensure that the conversationData is an array before pushing
  conversationData.push(userMessage);
  conversationData.push(systemMessage);

  try {
    const aiResponse = await ai.generate(model, conversationData);

    // Append AI response to the conversation
    conversationData.push({ role: 'assistant', content: aiResponse });

    // Save the conversation to file
    fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

    await repondre(aiResponse);
  } catch (error) {
    console.error("Error with AI generation: ", error);
    await repondre("Sorry, there was an error generating the response.");
  }
});
