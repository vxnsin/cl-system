const {
  welcomeChannelCF,
  welcomerole,
  botdevrole,
} = require("../../../config.json");
const { EmbedBuilder, GuildMember } = require("discord.js");
const welcomeSchema = require("../../schemas/welcome");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const { user, guild } = member;
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelCF);
    const role = member.guild.roles.cache.get(welcomerole);

    const welcomeData = await welcomeSchema.findOne();
    if (!welcomeData || !welcomeData.enabled) {
      return;
    }

    const randomtext = [
      `
    **Willkommen** <@${member.id}>. **(**\`#${guild.memberCount}\`**)** **Wir hoffen, du hast Pizza mitgebracht.** 👋`,
      `
    **Wir haben dich bereits erwartet,** <@${member.id}> **(**\`#${guild.memberCount}\`**)** 👋`,
      `**Huch!** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **ist zu uns gestolpert.** 👋`,
      `<@${member.id}> **(**\`#${guild.memberCount}\`**)** **gibt allen eine Runde aus.** 👋`,
      `**Hey,** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **sind wir froh das du uns gefunden hast.** 👋`,
      `**Endlich,** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **hat unsere Community gefunden.** 👋`,
      `**Herzlich Willkommen** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **Sag hallo.** 👋`,
      `<@${member.id}> **(**\`#${guild.memberCount}\`**)** **ist gerade auf den Server geschlitter.** 👋`,
      `<@${member.id}> **(**\`#${guild.memberCount}\`**)** **ist auf den Server gehüpft.** 👋`,
      `<@${member.id}> **(**\`#${guild.memberCount}\`**)** **hat den weg gefunde.** 👋`,
      `**Begrüßt,** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **als neuen Teil der Community!** 👋`,
      `**Juhu,** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **du hast es zu uns geschafft!** 👋`,
      `**Ein wildes** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **erscheint!** 👋`,
      `<@${member.id}> **(**\`#${guild.memberCount}\`**)** **Hilft uns die Welt zu erobern.** 👋`,
      `**Kann jemand** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **etwas herumführen?** 👋`,
      `**Heißen wir** <@${member.id}> **(**\`#${guild.memberCount}\`**)** **Willkommen bei uns!** 👋`,
    ];
    const randomtextG =
      randomtext[Math.floor(Math.random() * randomtext.length)];

    welcomeChannel.send("<a:Blob_Joined:1064517971839569972> " + randomtextG);
    await member.roles.add(role);

    setTimeout(async () => {
      await member.roles.remove(role);
    }, 86400000);
  },
};
