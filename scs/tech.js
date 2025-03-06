const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { cmd } = require('Ibrahim/adams');

const pluginsPath = path.join(__dirname, '../plugins');
const githubUrl = "https://raw.githubusercontent.com/Devbmb/bmb-xmd/refs/heads/main/bmb.json"; // Change to your actual GitHub repo

let shuffledImages = [];
let imageIndex = 0;

// Function to fetch images from GitHub JSON
async function fetchImages() {
    try {
        let response = await axios.get(githubUrl);
        if (response.data && Array.isArray(response.data.images)) {
            shuffledImages = response.data.images.sort(() => Math.random() - 0.5); // Shuffle images
            imageIndex = 0;
        } else {
            console.log("⚠ Invalid JSON format: Missing 'images' array.");
        }
    } catch (error) {
        console.log("⚠ Failed to fetch images from GitHub:", error.message);
    }
}

// Get next image from the shuffled list
async function getNextImage() {
    if (shuffledImages.length === 0) {
        await fetchImages();
    }
    let image = shuffledImages[imageIndex];
    imageIndex++;

    if (imageIndex >= shuffledImages.length) {
        shuffledImages = shuffledImages.sort(() => Math.random() - 0.5); // Shuffle again
        imageIndex = 0;
    }
    return image;
}

// Command to list all available commands
cmd({
    pattern: "list",
    alias: ["listcmd", "commands"],
    desc: "Show all available commands",
    category: "menu1",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return reply("⚠ No command files found.");
        }

        let commandGroups = {};

        // Read each file and extract both `pattern` and `category` from all types of matches
        files.forEach(file => {
            let content = fs.readFileSync(path.join(pluginsPath, file), 'utf-8');
            let patternMatch = content.match(/(?:pattern|\'pattern\'):\s*["']([^"']+)["']/);  // Match both `pattern: ""` and `'pattern': ""`
            let categoryMatch = content.match(/(?:category|\'category\'):\s*["']([^"']+)["']/);  // Match both `category: ""` and `'category': ""`

            if (patternMatch && categoryMatch) {
                let command = patternMatch[1];
                let category = categoryMatch[1];

                // Include all patterns and categories without restrictions
                if (!commandGroups[category]) {
                    commandGroups[category] = [];
                }
                commandGroups[category].push(command);
            }
        });

        if (Object.keys(commandGroups).length === 0) {
            return reply("⚠ No valid commands found.");
        }

        // Build the message in your preferred format
        let commandList = '';

        for (let category in commandGroups) {
            commandList += `╭━━〔 *${category}* 〕━┈⊷\n`;
            commandList += `┃◈╭────────────·๏\n`;

            commandGroups[category].forEach(cmd => {
                commandList += `┃◈┃• ${cmd}\n`;
            });

            commandList += `┃◈└───────────┈⊷\n`;
            commandList += `╰─────────────┈⊷\n\n`;
        }

        // Get random image from GitHub JSON
        let imageUrl = await getNextImage();

        // Send the image with context info
        await conn.sendMessage(
            from,
            {
                image: { url: imageUrl },
                caption: commandList,
                contextInfo: {
                    mentionedJid: [m.sender],  // Mention the sender
                    forwardingScore: 999,  // Add the forwarding score
                    isForwarded: true,  // Mark the message as forwarded
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363395768630577@newsletter',  // Add newsletter JID
                        newsletterName: '🌟 𝙱.𝙼.𝙱-𝚇𝙼𝙳 🌟',  // Add newsletter name
                        serverMessageId: 143  // Add server message ID
                    }
                }
            },
            { quoted: mek }
        );

        // Send the audio message
        await conn.sendMessage(
            from,
            {
                audio: { url: 'https://github.com/devbmb/B.M.B-XMD-DATA/raw/refs/heads/main/bmbtech/Menu.mp3' },
                mimetype: 'audio/mp4',
                ptt: true
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
