const { EmbedBuilder } = require("discord.js")
const { serverid } = require("../../config.json")
const { einjahrrole } = require("../../erfolge.json")
module.exports = (client) => {
    const guild = client.guilds.cache.get(serverid);
    guild.members.fetch().then((members) => {
      members.forEach((member) => {
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        const joinedAt = member.joinedAt.getTime();
        const currentDate = Date.now();
  
        if (currentDate - joinedAt >= oneYear) {
          const role = guild.roles.cache.get(einjahrrole);
          member.roles.add(role);

          const einjahrembed = new EmbedBuilder()
          .setTitle("<a:trophe:1116364779808890941> | **ERFOLG ERHALTEN**")
          .setDescription("**Herzlichen Glückwunsch zu diesem Erfolg!**")
          .addFields([
            {
                name: `<:Pfeil:995731145490706483> **Erfolg freigeschalten:** \`🧡 - 1 Jahr Server-Mitglied\``,
                value: `> Es hat wahrscheinlich sehr lange gebraucht diesen Erfolg zu erhalten.`
            },
            {
                name: `<:Pfeil:995731145490706483> **Du willst noch mehr erfolge?**`,
                value: `> Dann Schau doch mal hier rein: <#993085567006937089>`
            }
          ])
          member.send({content: `**ERFOLG FREIGESCHALTET!**`, embeds: {einjahrembed}});
        }
      });
    });
  };
  