"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { adams } = require("../Ibrahim/adams");

adams({ nomCom: "git1", catégorie:"Général", reaction: "🌟", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://github.com/bmb200/B.M.B-XMD';
  const img = 'https://files.catbox.moe/idioc5.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `*hellow whatsaap user
this is* *leonard_md.*\n support our channel *by*, `https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z`

_________● *𝙱.𝙼.𝙱-𝚇𝙼𝙳* ●____________
|💥 *ʀᴇᴘᴏsɪᴛᴏʀʏ:* ${data.html_url}
|🌟 *sᴛᴀʀs:* ${repoInfo.stars}
|🍽 *ғᴏʀᴋs:* ${repoInfo.forks}
|⌚️ *ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ:* ${releaseDate}
|🕐 *ᴜᴘᴅᴀᴛᴇ ᴏɴ:* ${repoInfo.lastUpdate}
|👨‍💻 *ᴏᴡɴᴇʀ:* *𝙱.𝙼.𝙱-𝚇𝙼𝙳*
|💞 *ᴛʜᴇᴍᴇ:* *𝙱.𝙼.𝙱-𝚇𝙼𝙳*
|🥰*ᴏɴʟʏ ɢᴏᴅ ᴄᴀɴ ᴊᴜᴅɢᴇ ᴍᴇ!👑*
__________________________________
            *ᴍᴀᴅᴇ ᴡɪᴛʜ 𝙱.𝙼.𝙱-𝚇𝙼𝙳*`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
    
