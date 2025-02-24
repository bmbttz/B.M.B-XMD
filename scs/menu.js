const { adams } = require("../Ibrahim/adams");
const moment = require("moment-timezone");
const axios = require("axios");
const s = require(__dirname + "/../config");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Dynamic greetings
const greetings = {
    morning: "🌄 Good Morning! Let's kickstart your day!",
    afternoon: "☀️ Good Afternoon! Stay productive!",
    evening: "🌆 Good Evening! Time to relax!",
    night: "🌙 Good Night! See you tomorrow!",
};

// GitHub audio files
const githubRawBaseUrl = "https://raw.githubusercontent.com/ibrahimaitech/bwm-xmd-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const getRandomAudio = () => audioFiles[Math.floor(Math.random() * audioFiles.length)];

const getMimeType = (url) => (url.endsWith(".wav") ? "audio/wav" : "audio/mpeg");

// Menu images and thumbnail URLs
const menuImages = [
    "https://files.catbox.moe/13i93y.jpeg",
    "https://files.catbox.moe/2696sn.jpeg",
    "https://files.catbox.moe/soj3q4.jpeg",
    "https://files.catbox.moe/bddwnw.jpeg",
    "https://files.catbox.moe/f6zee8.jpeg",
    "https://files.catbox.moe/dd93hl.jpg",
    "https://files.catbox.moe/omgszj.jpg",
    "https://files.catbox.moe/sf6xgk.jpg",
    "https://files.catbox.moe/nwvoq3.jpg",
    "https://files.catbox.moe/040de7.jpeg",
    "https://files.catbox.moe/3qkejj.jpeg",
];
const randomImage = () => menuImages[Math.floor(Math.random() * menuImages.length)];

// GitHub repo stats function
const fetchGitHubStats = async () => {
    try {
        const repo = "devibraah/B.M.B-XMD";
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const forks = response.data.forks_count || 0;
        const stars = response.data.stargazers_count || 0;
        const totalUsers = (forks * 2) + (stars * 2);
        return { forks, stars, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

// Main menu command
adams({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../Ibrahim/adams");
    let coms = {};

    // Organize commands by category
    cm.map((com) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper]) coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom);
    });

    moment.tz.setDefault(s.TZ || "Africa/arusha");
    const date = moment().format("DD/MM/YYYY");
    const time = moment().format("HH:mm:ss");
    const hour = moment().hour();

    // Determine greeting based on time
    let greeting = greetings.night;
    if (hour >= 5 && hour < 12) greeting = greetings.morning;
    else if (hour >= 12 && hour < 18) greeting = greetings.afternoon;
    else if (hour >= 18 && hour <= 22) greeting = greetings.evening;

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    // Prepare command list with readmore before specific categories
    let commandList = "";
    const sortedCategories = Object.keys(coms).sort();
    sortedCategories.forEach((cat) => {
        if (cat === "ABU") {
            commandList += `╰••┈••➤ ${readmore}\n🗂 *${cat}*:\n\n`;
        } else if (cat.toLowerCase().includes("download") || cat.toLowerCase().includes("github")) {
            commandList += `${readmore}\n📃 *${cat}*:\n\n`;
        } else {
            commandList += `\n📜 *${cat}*:\n\n`;
        }

        let categoryCommands = coms[cat];
        for (let i = 0; i < categoryCommands.length; i++) {
            commandList += `🟢 ${categoryCommands[i]}\n`; // Display commands in a list
        }
        commandList += `\n`;
    });

    // Select assets
    const image = randomImage();
    const image1 = randomImage();
    const randomAudioFile = getRandomAudio();
    const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

    const menuType = s.MENUTYPE || (Math.random() < 0.5 ? "1" : "2"); // Randomly pick if blank

    const footer = "\n\n®2025 ʙᴡᴍ xᴍᴅ";

    try {
        // Send menu message
        await zk.sendMessage(dest, {
            image: { url: image1 },
            caption: `
╭───❖
┃🚀 ʙᴏᴛ name 🅑🅜🅑-🅧🅜🅓
┃🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
┃📅 ᴅᴀᴛᴇ: ${date}
┃⏰ ᴛɪᴍᴇ: ${time}
┃👥 🄱🄼🄱 ᴜsᴇʀs: 1${formattedTotalUsers}
╰───❖
${greeting}

> ©BMB-XMD

${commandList}${footer}
`,
            contextInfo: {
                forwardedManyTimes: true
            }
        });

        // Send audio message
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: getMimeType(audioUrl),
            ptt: true,
            contextInfo: {
                forwardedManyTimes: true
            }
        });
    } catch (error) {
        console.error("Error sending menu:", error);
    }
});
