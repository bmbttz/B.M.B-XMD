
"use strict";
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs-extra");
const zlib = require("zlib");
const conf = require("./config");
const logger = pino().child({ level: "silent" });

// Rate-limit variables
let requestCount = 0;
const RATE_LIMIT = 20; // Max requests per minute
setInterval(() => (requestCount = 0), 60000); // Reset every minute

// Delay utility function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState("./Session");

    const zk = makeWASocket({
        version,
        logger,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        printQRInTerminal: true,
    });

    const store = makeInMemoryStore({
        logger: pino().child({ level: "silent", stream: "store" }),
    });
    store.bind(zk.ev);

    zk.ev.on("messages.upsert", async (m) => {
        if (requestCount >= RATE_LIMIT) {
            console.log("Rate limit reached. Delaying requests...");
            await delay(5000);
        }
        requestCount++;

        const { messages } = m;
        const message = messages[0];

        if (message.key.remoteJid === "status@broadcast") {
            console.log("Status message detected.");
            await delay(1000); // Throttle status reactions
        }
    });

    zk.ev.on("call", async (callData) => {
        if (conf.ANTICALL === "yes") {
            const callId = callData[0].id;
            const callerId = callData[0].from;
            try {
                await zk.rejectCall(callId, callerId);
                await delay(1000); // Prevent rate-limit violations
                await zk.sendMessage(callerId, {
                    text: "🚫 *Call Rejected!* Please contact the bot owner for assistance.",
                });
            } catch (error) {
                console.error("Error handling call:", error);
            }
        }
    });

    setInterval(async () => {
        if (conf.AUTO_BIO === "yes") {
            const bio = `B.M.B XMD Bot Online. Time: ${new Date().toLocaleTimeString()}`;
            try {
                await zk.updateProfileStatus(bio);
                console.log("Updated bio:", bio);
            } catch (error) {
                console.error("Error updating bio:", error);
            }
        }
    }, 60000); // Update bio every minute

    zk.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const reason = new Boom(lastDisconnect.error)?.output.statusCode;
            console.log("Connection closed. Reason:", reason);
            if (reason !== 401) main();
        } else if (connection === "open") {
            console.log("Connection established successfully!");
        }
    });

    process.on("unhandledRejection", (reason, promise) => {
        console.error("Unhandled Rejection:", reason, "Promise:", promise);
    });
}

main();
