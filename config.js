const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = { 
    session: process.env.SESSION_ID || '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝙱𝙼𝙱 𝚇𝙼𝙳",
    NUMERO_OWNER: process.env.NUMERO_OWNER || " 𝙱𝙼𝙱 𝚇𝙼𝙳",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT: process.env.BOT_NAME || '𝙱𝙼𝙱 𝚇𝙼𝙳',
    URL: process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/bpqkpf.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    ETAT: process.env.PRESENCE || '',
    CHATBOT: process.env.CHATBOT || 'yes',
    CHATBOT1: process.env.CHATBOT1 || 'yes',
    SELF_CHATBOT: process.env.SELF_CHATBOT || 'yes',
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1: process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2: process.env.ANTIDELETE2 || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',
    MENUTYPE: process.env.MENUTYPE || '',
    AUTO_REACT: process.env.AUTO_REACT || 'yes',
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_REPLY: process.env.AUTO_REPLY || 'yes',
    AUTO_READ: process.env.AUTO_READ || 'yes',
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || 'yes',
    AUTO_REJECT_CALL: process.env.AUTO_REJECT_CALL || 'yes',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',
    ANTILINK_GROUP: process.env.ANTILINK_GROUP || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'yes',
    AUTO_SAVE_CONTACTS_NAME: "💥 𝙱𝙼𝙱 𝚇𝙼𝙳", // Default name prefix for new contacts
    AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" 
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",

    // New additions
    LOGGING: process.env.LOGGING || "enabled", // Enable or disable logging
    DEBUG_MODE: process.env.DEBUG_MODE || "false", // Toggle debug mode
    MAX_COMMAND_RETRY: process.env.MAX_COMMAND_RETRY || "3", // Maximum retry attempts for commands
    BOT_VERSION: process.env.BOT_VERSION || "1.0.0", // Version of the bot
    NOTIFY_ON_UPDATE: process.env.NOTIFY_ON_UPDATE || "yes", // Notify on bot updates
    BACKUP_INTERVAL: process.env.BACKUP_INTERVAL || "24h", // Interval for database backups
    SUPPORT_CONTACT: process.env.SUPPORT_CONTACT || "support@example.com", // Default support email or contact
    AUTO_UPDATE_CHECK: process.env.AUTO_UPDATE_CHECK || "yes", // Automatically check for updates
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
