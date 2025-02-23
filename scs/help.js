const { adams } = require("../Ibrahim/adams");

const commands = [
  {
    name: "list",
    description: "Displays a list of all available commands."
  },
  {
    name: "help",
    description: "Shows detailed information about each command."
  }
];

adams({ nomCom: "commands", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;

    const userCommand = ms.trim().toLowerCase();

    // List all commands
    if (userCommand === "list") {
        let commandListMsg = "Here are all the available commands:\n\n";
        commands.forEach((cmd) => {
            commandListMsg += `- ${cmd.name}\n`;
        });
        repondre(commandListMsg);

    // Help with descriptions of each command
    } else if (userCommand === "help") {
        let helpMsg = "Here is a list of commands with their descriptions:\n\n";
        commands.forEach((cmd) => {
            helpMsg += `*${cmd.name}* - ${cmd.description}\n`;
        });
        repondre(helpMsg);

    // If the command is unrecognized
    } else {
        repondre("Sorry, I didn't understand that. Type 'list' to see all available commands or 'help' for detailed descriptions.");
    }
});
