const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const {changelogchannel } = require("../../../config.json")
const jsonFilePath = path.join(__dirname, '../../changelog.json');



module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-news-send")
    .setDescription("➕ • Sende den Changelog")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {

    sendWeeklyChangelog(client)
    await interaction.reply({content:"`✅` • Changelog wurde gesendet", ephemeral: true});
  },
};
async function sendWeeklyChangelog(client) {
    try {
      const emojiList = {
        '🟢': '<:PointGreen:1102209914392301649>',
        '🟡': '<:PointYellow:1102209897967407125>',
        '🟠': '<:PointOrange:1102209881701875772>',
        '🔴': '<:PointRed:1102209861363703869>',
        // Weitere benutzerdefinierte Emojis hier definieren
      };
      let changelogData = fs.readFileSync(jsonFilePath, 'utf8');
      let changelog = JSON.parse(changelogData);
  
      if (!Array.isArray(changelog)) {
        console.error('Fehler: Changelog ist kein Array');
        return;
      }

        const categories = {};
        for (const entry of changelog) {
            const { kategorie, emoji, update } = entry;
            if (!categories[kategorie]) {
                categories[kategorie] = [];
            }
            categories[kategorie].push({ emoji, update });
        }
        const now = new Date();
        const currentDay = now.getDay();
        const daysToAddStart = currentDay === 0 ? -6 : 1 - currentDay;
        const daysToAddEnd = currentDay === 0 ? 0 : 7 - currentDay;
        
        const weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToAddStart);
        const weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToAddEnd);
        
        const options = { day: '2-digit', month: '2-digit' };
        const weekStart = weekStartDate.toLocaleDateString('de-DE', options);
        const weekEnd = weekEndDate.toLocaleDateString('de-DE', options);
        
        const weekRange = `${weekStart.slice(0, -1)} - ${weekEnd.slice(0, -1)}`;
        
           
        const embed = new EmbedBuilder()
            .setTitle('<a:Neuigkeiten:1018910061348798564> » UPDATE-WOCHENRÜCKBLICK [' + weekRange + ']')
            .setColor('#F1C40F')
            .setImage("https://cdn.discordapp.com/attachments/967522063944392704/1113906039625093151/Update_Wochen_Ruckblick_Banner.png")


            let hasUpdates = false;

            for (const category in categories) {
              const categoryName = getCategoryName(category);
              const categoryEntries = categories[category];
              
              const fieldContent = categoryEntries.map(entry => {
                let emoji = entry.emoji;
                if (emojiList.hasOwnProperty(emoji)) {
                  emoji = emojiList[emoji];
                }
                return `${emoji} » ${entry.update}`;
              }).join('\n');
              embed.setDescription('<:PointRed:1102209861363703869> = Bug behoben/Entfernt \n<:PointOrange:1102209881701875772> = Änderung\n<:PointYellow:1102209897967407125> = Wartungsarbeiten\n<:PointGreen:1102209914392301649> = Neu hinzugefügt\n\n<:Pfeil:995731145490706483> Diese Nachricht wird mit jeder **neuen Änderung** welche in dieser Woche passiert ist, bearbeitet.\n**Der Ping zu allen Änderungen erfolgt am Ende jeder Woche.**\nㅤ');
              embed.addFields({ name: categoryName, value: fieldContent, inline: false });
              hasUpdates = true;
            }


        if (!hasUpdates) {
          embed.setDescription("<:PointRed:1102209861363703869> = Bug behoben/Entfernt \n<:PointOrange:1102209881701875772> = Änderung\n<:PointYellow:1102209897967407125> = Wartungsarbeiten\n<:PointGreen:1102209914392301649> = Neu hinzugefügt\n\n<:Pfeil:995731145490706483> Diese Nachricht wird mit jeder **neuen Änderung** welche in dieser Woche passiert ist, bearbeitet.\n**Der Ping zu allen Änderungen erfolgt am Ende jeder Woche.**\nㅤ\nㅤ\n> In dieser Woche gab es keine Änderungen.\nㅤ\nㅤ")
      }
        const channel = client.channels.cache.get(changelogchannel);
            const messagesend = await channel.send({content: `Eine neue Woche, ein neues Glück. <a:discordbloblove:968872502057140264>`, embeds: [embed] });
            await messagesend.react('<:smileh:1114273430699790446>');
            await messagesend.react('<:smile2:1114273432100683786>');
            await messagesend.react('<:smile3:1114273433405112360>');
            const emptyChangelog = [];
           fs.writeFile(jsonFilePath, JSON.stringify(emptyChangelog), 'utf8', (err) => {
    if (err) {
      console.error('❌ • Fehler beim Leeren der Changelog-Datei:', err);
    } else {
      console.log('✅ • Changelog-Datei erfolgreich geleert.');
    }
  });
    } catch (error) {
        console.error('❌ • Fehler beim Senden des Changelogs:', error);
    }
}

function getCategoryName(category) {
  if (category === "moderation") {
      return "> <:ModeratorBadge:968871298728067082> - **CL`👮`MODERATION <:bot:1114273428464218213> - UPDATE**";
  } else if (category === "security") {
        return "> <a:Zahnrad:968872268325355572> - **CL`🚨`SECURITY <:bot:1114273428464218213> - UPDATE**";
  } else if (category === "partner") {
    return "> <:squarepartner:968869347013578762> - **CL`🤝`PARTNER <:bot:1114273428464218213> - UPDATE**";
  } else if (category === "gift") {
        return "> <a:Giveaway:1072144077103054909> - **CL`🎁`GIFT <:bot:1114273428464218213> - UPDATE**";
    } else if (category === "system") {
      return "> <a:pin:1007275106810216598> - **CL`⚙️`SYSTEM <:bot:1114273428464218213> - UPDATE **";
    } else if (category === "discord") {
        return "> <:discord:997847319930216508> - **Discord Server - UPDATE**";
    } else {
        return category; 
  }
}
