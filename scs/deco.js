const {
  adams
} = require("../Ibrahim/adams");
const {
  default: axios
} = require("axios");
adams({
  'nomCom': "pair",
  'aliases': ["session", "pair", "paircode", "qrcode"],
  'reaction': '♂️',
  'categorie': "General"
}, async (_0x2ce843, _0x1c44fd, _0x32de8a) => {
  const {
    repondre: _0x2e61d5,
    arg: _0x8621a4
  } = _0x32de8a;
  try {
    if (!_0x8621a4 || _0x8621a4.length === 0) {
      return _0x2e61d5("Example Usage: .code 25574175xxxx.");
    }
    await _0x2e61d5("*Wait 𝙱.𝙼.𝙱-𝚇𝙼𝙳 is generating your pair code ✅...*");
    const _0x386b0a = encodeURIComponent(_0x8621a4.join(" "));
    const _0x1ea92d = " https://bmb-session-1.onrender.com/pair/code?number=" + _0x386b0a;
    const _0xb59e41 = await axios.get(_0x1ea92d);
    const _0x1b71f0 = _0xb59e41.data;
    if (_0x1b71f0 && _0x1b71f0.code) {
      const _0x40751a = _0x1b71f0.code;
      await _0x2e61d5('' + _0x40751a);
      await _0x2e61d5("Here is your pair code, copy and paste it to the notification above or link devices.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (_0x21fdc6) {
    console.error("Error getting API response:", _0x21fdc6.message);
    _0x2e61d5("Error getting response from API.");
  }
});
// Scan Command
adams({ nomCom: "scan", reaction: "🔍", categorie: "pair" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const instructions = `
*📖 HOW TO GET 𝙱.𝙼.𝙱-𝚇𝙼𝙳 SESSION:*

1️⃣ **Open the link below**

> https://bmb-session-1.onrender.com

2️⃣ **Enter Your WhatsApp Number**  

   👉 Type your WhatsApp number with your country code without (+) (e.g., 255xxxxxxxx) and tap **Submit**.  

3️⃣ **Receive a Code**  

   👉 b.m.b Tech will send a short code, Copy it to your keyboard.  

4️⃣ **Check WhatsApp Notification**  

   👉 WhatsApp will notify you. Tap on the notification and enter the code sent by Ibrahim Tech.  

5️⃣ **Wait for the Session**  

   👉 After loading, it will link then bmb Tech will send a session to your WhatsApp number.  

6️⃣ **Copy and Share the Session**  

   👉 Copy the long session and send it to your deployer.  

*💻 Powered by 𝙱.𝙼.𝙱-𝚇𝙼𝙳*  


> Made by 𝙱.𝙼.𝙱-𝚇𝙼𝙳
    `;

    const instructionMessage = generateWAMessageFromContent(dest, {
      extendedTextMessage: {
        text: instructions
      }
    }, {});

    await zk.relayMessage(dest, instructionMessage.message, {
      messageId: instructionMessage.key.id
    });
  } catch (error) {
    console.error('Error sending instructions:', error.message);
    repondre('Error sending instructions.');
  }
});
                                            
