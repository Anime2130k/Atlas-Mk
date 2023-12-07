const fs = require("fs");
const axios = require("axios");
const path = require("path");
const package = require("../package.json");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "sc",
  "support",
  "supportgc",
  "script",
  "system",
  "info",
  "about",
];

module.exports = {
  name: "systemcommands",
  alias: [...mergedCommands],
  uniquecommands: ["script", "support", "help", "system", "about"],
  description: "All system commands",
  start: async (
    Atlas,
    m,
    { pushName, prefix, inputCMD, doReact, text, args }
  ) => {
    const pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {
      case "script":
      case "sc":
        await doReact("🌸");
        let repoInfo = await axios.get(
          "https://youtube.com/@animeparadise9503?si=qz-jhvpjjp3f4bd6"
        );
        let repo = repoInfo.data;
        console.log(repo);
        let txt = `            🧣 *${botName}'s Script* 🧣\n\n*✨🌸:* ${
          https://youtube.com/@animeparadise9503?si=qz-jhvpjjp3f4bd6*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt }, { quoted: m });
        break;

      case "support":
      case "supportgc":
        await doReact("🌸");
        let txt2 = `              🧣 *Support Group* 🧣\n\n*${botName}* join and Adventure with us✨❄️.\n\n*Link:* ${suppL}\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Pokemon✨🌸.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt2 }, { quoted: m });
        break;

      case "help":
      case "h":
      case "menu":
        await doReact("☃️");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
            formatted += `\`\`\`${commands
              .map((cmd) => `⥼   ${prefix + cmd}`)
              .join("\n")}\`\`\`\n\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\nHey 👋 *${pushName}*,\n\nI am *${botName}*, *Ash Ketchum* the Pokemon master Best Friend of TIKU✨🦋 lets Adventure together⛩️.\n\n**𒀭 ˖ ࣪ 𓂃 𓄰 ASH KETCHUM 𓄰 𓂃  ˖ ࣪𒀭*.\n\n𓊆♡︎𓊇:*  ${prefix}\n\n${formattedCommands}\n\n\n*Pomemon✨🌸*`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;

      case "system":
      case "info":
      case "about":
        await doReact("🌸");
        let xyz = await axios.get(
          "https://youtube.com/@animeparadise9503?si=qz-jhvpjjp3f4bd6"
        );
        let latest = xyz.data[0].tag_name;
        const version2 = package.version;
        let nodeVersion = process.version;
        let os = process.platform;
        let osVersion = process.release.lts;
        let architecture = process.arch;
        let computername = process.env.COMPUTERNAME;
        let os2 = process.env.OS;
        let cpu2 = process.env.PROCESSOR_IDENTIFIER;
        let core = process.env.NUMBER_OF_PROCESSORS;

        let txt4 = `              𓂃 𓄰 *Info* 𓄰𓂃


*⸙͎۪۫ Version:* ${nodeVersion}

*⸙͎۪۫ Current Bot version:* ${latest}

*⸙͎۪۫ Latest Bot version:* ${latest}

*⸙͎۪۫ user* : 34747

*⸙͎۪۫ groups* : 678
`;

        if (latest.includes(version2) || version2.includes(latest)) {
          txt4 += `\n\n*Thanks for Adventure with me 🌸:*`;
        }
        Atlas.sendMessage(m.from, { image: pic, caption: txt4 }, { quoted: m });

        break;

      default:
        break;
    }
  },
};
