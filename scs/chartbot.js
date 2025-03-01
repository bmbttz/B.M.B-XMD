const { adams } = require('../Ibrahim/adams');
const { default: axios } = require('axios');

// State to enable/disable the bot
let isBotActive = false;

// Command to turn the bot ON
adams({ nomCom: "boton", reaction: "✅", categorie: "Control" }, (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  if (isBotActive) {
    return repondre("The bot is already active!");
  }

  isBotActive = true;
  repondre("✅ 𝙱.𝙼.𝙱-𝚇𝙼𝙳 is now active.");
});

// Command to turn the bot OFF
adams({ nomCom: "botoff", reaction: "❌", categorie: "Control" }, (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  if (!isBotActive) {
    return repondre("The bot is already inactive!");
  }

  isBotActive = false;
  repondre("❌ 𝙱.𝙼.𝙱-𝚇𝙼𝙳 is now inactive.");
});

// Main handler for all incoming messages
adams({ reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    // If the bot is inactive, ignore all inputs
    if (!isBotActive) {
      return; // Ignore messages silently
    }

    // Immediate response to keywords
    const keywords = ["chartbot", "chatbot", "bot", "gpt", "ai", "chat"];
    if (arg.some(word => keywords.includes(word.toLowerCase()))) {
      return repondre("I am 𝙱.𝙼.𝙱-𝚇𝙼𝙳, how can I help you?");
    }

    // If no arguments are provided, prompt the user
    if (!arg || arg.length === 0) {
      return repondre("I'm here! Feel free to ask me anything.");
    }

    // Combine all arguments into a single query
    const question = arg.join(' ');

    // Fetching the response from the external API
    const response = await axios.get(
      `https://apis.ibrahimadams.us.kg/api/ai/gpt4?q=${encodeURIComponent(question)}&apikey=ibraah-tech`
    );

    const data = response.data;
    if (data) {
      repondre(data.result);
    } else {
      repondre("I couldn't process your request. Try again!");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, something went wrong while processing your request.");
  }
});
