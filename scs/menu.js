
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
const githubRawBaseUrl = "https://raw.githubusercontent.com/𝙱.𝙼.𝙱/𝙱.𝙼.𝙱-𝚇𝙼𝙳-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const getRandomAudio = () => audioFiles[Math.floor(Math.random() * audioFiles.length)];

const getMimeType = (url) => (url.endsWith(".wav") ? "audio/wav" : "audio/mpeg");

// Menu images and thumbnail URLs
const menuImages = [
    "https://files.catbox.moe/3ats6w.jpg",
    "https://files.catbox.moe/nnp1zf.jpeg",
    "https://files.catbox.moe/3en2sc.jpeg",
    "https://files.catbox.moe/bddwnw.jpeg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/8piaax.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/2pxc8g.jpg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/8piaax.jpg",
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
        if (cat === "𝙱𝙼𝙱 𝚇𝙼𝙳") {
            commandList += `╰••┈••➤ ${readmore}\n🗂 *${cat}*:\n\n`;
        } else if (cat.toLowerCase().includes("download") || cat.toLowerCase().includes("github")) {
            commandList += `${readmore}\n📃 *${cat}*:\n\n`;
        } else {
            commandList += `\n📜 *${cat}*:\n\n`;
        }

        let categoryCommands = coms[cat];
        for (let i = 0; i < categoryCommands.length; i++) {
            commandList += `➡️ ${categoryCommands[i]}\n`; // Display commands in a list
        }
        commandList += `\n`;
    });

    // Select assets
    const image = randomImage();
    const image1 = randomImage();
    const randomAudioFile = getRandomAudio();
    const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

    const menuType = s.MENUTYPE || (Math.random() < 0.5 ? "1" : "2"); // Randomly pick if blank

    const footer = "\n\n®2025 𝙱.𝙼.𝙱-𝚇𝙼𝙳";

    try {
        // Send menu based on the requested category
        const requestedCategory = commandeOptions.category || 'General'; // Get the requested category or default to 'General'

        if (menuType === "1") {
            // Menu Type 1 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭┈┈┈┈┈╮
│ 𝙱.𝙼.𝙱-𝚇𝙼𝙳 𝙼𝙴𝙽𝚄
├┈┈┈┈•➤
│ 🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
│ 📆 ᴅᴀᴛᴇ: ${date}
│ ⏰ ᴛɪᴍᴇ: ${time}
│ 👪 🄱🄼🄱 ᴜsᴇʀs: 1${formattedTotalUsers}
╰┈┈┈┈┈╯
${greeting}

> ©𝙱.𝙼.𝙱-𝚇𝙼𝙳

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝙱.𝙼.𝙱 ʙʏ 𝙱.𝙼.𝙱-𝚇𝙼𝙳😎",
                    },
                    externalAdReply: {
                        title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                    },
                },
            });
        } else {
            // Menu Type 2 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭───❖
┃🌟 ʙᴏᴛ name 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
┃📅 ᴅᴀᴛᴇ: ${date}
┃⏰ ᴛɪᴍᴇ: ${time}
┃👥 🄱🄼🄱 ᴜsᴇʀs: 1${formattedTotalUsers}
╰───❖
${greeting}

> ©𝙱.𝙼.𝙱-𝚇𝙼𝙳

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝙱.𝙼.𝙱 ʙʏ 𝙱.𝙼.𝙱-𝚇𝙼𝙳😎",
                    },
                    externalAdReply: {
                        title:"𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
                        showAdAttribution: true,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });
        }

        // Send audio
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: getMimeType(audioUrl),
            ptt: true,
        });
    } catch (error) {
        console.error("Error sending menu:", error);
    }
});







/**const { adams } = require("../Ibrahim/adams");
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
const githubRawBaseUrl =
    "https://raw.githubusercontent.com/ibrahimaitech/bwm-xmd-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const getRandomAudio = () => audioFiles[Math.floor(Math.random() * audioFiles.length)];

const getMimeType = (url) => (url.endsWith(".wav") ? "audio/wav" : "audio/mpeg");

// Menu images and thumbnail URLs
const menuImages = [
    "https://files.catbox.moe/3ats6w.jpg",
    "https://files.catbox.moe/nnp1zf.jpeg",
    "https://files.catbox.moe/3en2sc.jpeg",
    "https://files.catbox.moe/bddwnw.jpeg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/8piaax.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/2pxc8g.jpg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/8piaax.jpg",
];
const randomImage = () => menuImages[Math.floor(Math.random() * menuImages.length)];

// GitHub repo stats function
const fetchGitHubStats = async () => {
    try {
        const repo = "devibraah/𝙱.𝙼.𝙱-𝚇𝙼𝙳";
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

    moment.tz.setDefault(s.TZ || "Africa/arushai");
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
        if (cat === "𝙱.𝙼.𝙱-𝚇𝙼𝙳") {
            commandList += `╰••┈••➤ ${readmore}\n📂 *${cat}*:\n\n`;
        } else if (cat.toLowerCase().includes("download") || cat.toLowerCase().includes("github")) {
            commandList += `${readmore}\n📂 *${cat}*:\n\n`;
        } else {
            commandList += `\n📂 *${cat}*:\n\n`;
        }

        let categoryCommands = coms[cat];
        for (let i = 0; i < categoryCommands.length; i++) {
            commandList += `➡️ ${categoryCommands[i]}   `;
            if ((i + 1) % 3 === 0 || i === categoryCommands.length - 1) commandList += `\n`;
        }
        commandList += `\n`;
    });

    // Select assets
    const image = randomImage();
    const image1 = randomImage();
    const randomAudioFile = getRandomAudio();
    const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

    const menuType = s.MENUTYPE || (Math.random() < 0.5 ? "1" : "2"); // Randomly pick if blank

    const footer = "\n\n®2025 𝙱.𝙼.𝙱-𝚇𝙼𝙳";

    try {
        if (menuType === "1") {
            // Menu Type 1
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭┈┈┈┈┈╮
│ 𝙱.𝙼.𝙱-𝚇𝙼𝙳
├┈┈┈┈•➤
│ 🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
│ 📆 ᴅᴀᴛᴇ: ${date}
│ ⏰ ᴛɪᴍᴇ: ${time}
│ 👪 🄱🄼🄱 ᴜsᴇʀs: 1${formattedTotalUsers}
╰┈┈┈┈┈╯
${greeting}

> ©𝙱.𝙼.𝙱-𝚇𝙼𝙳

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝙱.𝙼.𝙱 ʙʏ 𝙱.𝙼.𝙱-𝚇𝙼𝙳😎",
                    },
                    externalAdReply: {
                        title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
                        showAdAttribution: false,
                        renderLargerThumbnail: false,
                    },
                },
            });
        } else {
            // Menu Type 2
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭───❖
┃🌟 ʙᴏᴛ ɴᴀᴍᴇ: 𝙱.𝙼.𝙱-𝚇𝙼𝙳
┃🕵️ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
┃📅 ᴅᴀᴛᴇ: ${date}
┃⏰ ᴛɪᴍᴇ: ${time}
┃👥 🄱🄼🄱 ᴜsᴇʀs: 1${formattedTotalUsers}
╰───❖
${greeting}

> ©𝙱.𝙼.𝙱-𝚇𝙼𝙳

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝙱.𝙼.𝙱 ʙʏ 𝙱.𝙼.𝙱-𝚇𝙼𝙳😎",
                    },
                    externalAdReply: {
                        title: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029Vb2eknR59PwL1OK4wR24",
                        showAdAttribution: false,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });
        }

        // Send audio
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: getMimeType(audioUrl),
            ptt: true,
        });
    } catch (error) {
        console.error("Error sending menu:", error);
    }
});
**/
