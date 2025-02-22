const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");

const fetchRepoStats = async () => {
    try {
        const repo = 'bmbtz/B.M.B-TECH';
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const { forks_count, stargazers_count, open_issues_count, watchers_count, language, created_at, updated_at } = response.data;

        return {
            forks: forks_count,
            stars: stargazers_count,
            issues: open_issues_count,
            watchers: watchers_count,
            language,
            created_at: new Date(created_at).toLocaleDateString(),
            updated_at: new Date(updated_at).toLocaleDateString()
        };
    } catch (error) {
        console.error("🚨 Error fetching repo stats:", error);
        return null;
    }
};

zokou({ nomCom: "repo", categorie: "Information" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, nomAuteurMessage } = commandeOptions;
    
    const repoStats = await fetchRepoStats();
    if (!repoStats) {
        return repondre("❌ Error retrieving repository info.");
    }

    let repoMsg = `
📌 *B.M.B-TECH GitHub Repository*
🔗 [Visit Repo](https://github.com/bmbtz/B.M.B-TECH)

🔹 *Stars:* ${repoStats.stars} ⭐  
🔹 *Forks:* ${repoStats.forks} 🍴  
🔹 *Watchers:* ${repoStats.watchers} 👀  
🔹 *Open Issues:* ${repoStats.issues} ❗  
🔹 *Main Language:* ${repoStats.language} 💻  
🔹 *Created On:* ${repoStats.created_at} 📅  
🔹 *Last Updated:* ${repoStats.updated_at} 🔄  

🌟 Stay updated with B.M.B-TECH innovations!
`;

    try {
        await zk.sendMessage(dest, { 
            image: { url: "https://imgur.com/a/scITaBB" },
            caption: repoMsg,
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Repo Info Error: " + e);
        repondre("❌ Repo Info Error: " + e);
    }
});