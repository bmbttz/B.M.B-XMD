const { adams } = require("../Ibrahim/adams");
const yts = require("yt-search");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const ffmpeg = require("fluent-ffmpeg");

async function searchYouTubeInfo(query) {
    try {
        const results = await yts(query);
        if (!results || !results.videos.length) {
            throw new Error("No results found on YouTube.");
        }

        const video = results.videos[0]; // Get the top result
        return {
            title: video.title,
            author: video.author.name,
            duration: video.timestamp,
        };
    } catch (error) {
        console.error("Error searching YouTube:", error);
        throw new Error("Failed to retrieve video information.");
    }
}

adams({ nomCom: "inf", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre("Please reply to a video or audio file.");
        return;
    }

    let mediaPath;

    if (msgRepondu.videoMessage || msgRepondu.audioMessage) {
        try {
            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage || msgRepondu.audioMessage);

            const outputPath = `${mediaPath}.mp3`;
            await new Promise((resolve, reject) => {
                ffmpeg(mediaPath)
                    .toFormat("mp3")
                    .on("end", resolve)
                    .on("error", reject)
                    .save(outputPath);
            });

            // Simulating filename or metadata extraction for query (you may replace this with real logic)
            const query = "sample query based on file content"; // Replace with metadata extraction logic
            const videoInfo = await searchYouTubeInfo(query);

            repondre(
                `*${videoInfo.title}*\n👤 Author: ${videoInfo.author}\n⏱️ Duration: ${videoInfo.duration}`
            );
        } catch (error) {
            console.error("Error processing media:", error);
            repondre("An error occurred while processing the file.");
        } finally {
            if (mediaPath && fs.existsSync(mediaPath)) {
                fs.unlinkSync(mediaPath);
            }
        }
    } else {
        repondre("Unsupported media type. Reply with a video or audio file.");
    }
});
