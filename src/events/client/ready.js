const { ActivityType, Game, EmbedBuilder } = require("discord.js");
const {serverid, onlinecounterc, serveruserc, changelogchannel } = require("../../../config.json")

const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
/*
const fs = require('fs');
const path = require('path');

client.on('ready', () => {
  setInterval(() => {
    const einjahrFile = path.join(__dirname, 'einjahr.js');
    if (fs.existsSync(einjahrFile)) {
      require(einjahrFile)(client);
    }
  }, 2 * 60 * 60 * 1000); // Führe alle 2 Stunden die einjahr.js aus
});
*/
const jsonFilePath = path.join(__dirname, '../../changelog.json');
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Event: Ready | 🟢 | `);
    console.log(`Bot eingeloggt:`);
    console.log(`Name: ${client.user.tag}`);
    console.log(`Made with ♥️ by Code_dex`);
	  const guild = client.guilds.cache.get("987277750400352317");
  if (!guild) return;

  const channel = guild.channels.cache.get("1109031510369116211");
  if (!channel) return;

    setInterval(() => {
      const guild = client.guilds.cache.get(serverid); // Die ID deines Servers einfügen
      if (!guild) {
        console.log("Der Server wurde nicht gefunden.");
        return;
      }
      guild.members.fetch().then((members) => {
        const onlineMembers = members.filter(
          (member) => !member.user.bot
        );
        if (onlineMembers.size === 0) return;
  
        const randomMember = onlineMembers.random();
        const username = randomMember.user.username;
  
        const customStatus = ` 💖 • mit ${username}`;
        client.user.setActivity(customStatus, { type: ActivityType.Playing });
      });
    }, 60000); // 10 Minuten = 600000

    setInterval(async()  =>  {
      try {
      const guild = await client.guilds.fetch(serverid);
      const category = guild.channels.cache.find(id => id == onlinecounterc);
    
      if (!category) {
          console.log('Ungültige Kategorie!');
          return;
      }
    
      const onlineMembers = guild.members.cache.filter(member => ['online', 'idle', 'dnd'].includes(member.presence?.status) && !member.user.bot);
      const onlineCount = onlineMembers.size;
      category.setName(`(👥) - [UNITY] - (ONLINE: ${onlineCount})`);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Kategorie:', error);
  }
  }, 60000); //1 Minute 60000
  setInterval(async()  =>  {
    const guild = await client.guilds.fetch(serverid);
	
    guild.channels.cache.find(id => id == serveruserc).setName(`(🌍) - [INFOS] - (USER: ${guild.members.cache.size})`);
},  60000) //1 Minute 60000

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 1; // 0 für Sonntag
rule.hour = 0;
rule.minute = 0;


// Erstelle einen Zeitplan für die Ausführung der Funktion sendWeeklyChangelog
schedule.scheduleJob(rule, () => {
  sendWeeklyChangelog(client);
});
}
}  

/*
setTimeout(() => {
  sendWeeklyChangelog(client);
}, 6000);
schedule.scheduleJob(rule, () => {
  sendWeeklyChangelog(client);
});
*/
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
            .setTitle('<a:Neuigkeiten:998236221132259429> » UPDATE-WOCHENRÜCKBLICK [' + weekRange + ']')
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
            const messagesend = await channel.send({content: `<@&1102321392202039366> | Eine neue Woche, ein neues Glück. <a:discordbloblove:968872502057140264>`, embeds: [embed] });
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
      return "> <a:pin:1007275106810216598> - **CL`⚙️`SYSTEM <:bot:1114273428464218213> - UPDATE**";
    } else if (category === "discord") {
        return "> <:discord:997847319930216508> - **Discord Server - UPDATE**";
    } else {
        return category; 
  }
}
