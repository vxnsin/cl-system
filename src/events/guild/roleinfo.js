const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const guildId = interaction.guild.id;
	  const guild = client.guilds.cache.get(guildId);
    //Erfolge
    const botdev = guild.roles.cache.get('953624773924114462');
    const bughunter = guild.roles.cache.get('996374123741712455');
    const year = guild.roles.cache.get('1002218734406078536');
    const booster = guild.roles.cache.get('1002604021145686116');
    //Team
    const owner = guild.roles.cache.get('955039096198299648');
    const coowner = guild.roles.cache.get('1098576842597879920');
    const admin = guild.roles.cache.get('968538838974754907');
    const dev = guild.roles.cache.get('954666890314276904');
    const mod = guild.roles.cache.get('953624261057187892');
    const sup = guild.roles.cache.get('867705591866589205');
    //Exkulsiv
    const boosterd = guild.roles.cache.get('1000688034670448701');
    const partner = guild.roles.cache.get('957191592345759795');
    if (interaction.values && interaction.values.length > 0) {
      const selectTargetValue = interaction.values[0];

      if (selectTargetValue === "erfolge") {
        const erfolgeembed = new EmbedBuilder()
          .setTitle("`🏆` • Server Erfolge")
          .setColor("Green")
          .setDescription(`» Mit Erfolgen kannst du vor deinen Freunden angeben und hast die Chance, in unserem Server einzigartige Ränge freizuschalten!\n \n${guild.roles.cache.get("953624773924114462")} • \`${botdev.members.size} 👥\`\nErhältst du, wenn du einen **Bot programmiert** hast und er von Discord **verifiziert** wurde.\n \n${guild.roles.cache.get("996374123741712455")} • \`${bughunter.members.size} 👥\`\nWenn du **5 Rechtschreibfehler** in einer Bot-Nachricht gefunden hast.\n \n${guild.roles.cache.get("1002218734406078536")} • \`${year.members.size} 👥\`\nSei bei uns **1 Jahr Server** Mitglied.\n \n${guild.roles.cache.get("1002604021145686116")} • \`${booster.members.size} 👥\`\nBooste diesen Server **3 Monate**.`)
          .setImage(
            "https://cdn.discordapp.com/attachments/967522063944392704/1113906474893185127/Unsere_Server_Erfolge.png"
          );
        interaction.reply({
          embeds: [erfolgeembed],
          ephemeral: true,
        });
      }
      if (selectTargetValue === "team") {
        const teamembed = new EmbedBuilder()
          .setTitle("`🏢` • Server Team")
          .setColor("Red")
          .setDescription(`» Hier kannst du alle unsere **Team-Ränge** sehen.\n \n${guild.roles.cache.get("955039096198299648")} • \`${owner.members.size} 👥\`\n**Aufgabe:** Die Server-Leitung kümmert sich um die ganze Server-Verwaltung und um die Organisation.\n \n${guild.roles.cache.get("953570242003607552")} • \`${coowner.members.size} 👥\`\n**Aufgabe:** Die Co-Leitung unterstützt die Server-Leitung bei der Server-Verwaltung.\n \n${guild.roles.cache.get("968538838974754907")} • \`${admin.members.size} 👥\`\n**Aufgabe:** Die Administratoren helfen der Co-Leitung mit.\n \n${guild.roles.cache.get("954666890314276904")} • \`${dev.members.size} 👥\`\n**Aufgabe:** Entwickeln neue Server-Features und bearbeiten Bots.\n \n${guild.roles.cache.get("953624261057187892")} • \`${mod.members.size} 👥\`\n**Aufgabe:** Sorgen für die Einhaltung der Server-Regeln.\n \n${guild.roles.cache.get("867705591866589205")} • \`${sup.members.size} 👥\`\n**Aufgabe:** Supporten die Mitglieder auf dem Discord-Server & bearbeiten Tickets.`);
        interaction.reply({
          embeds: [teamembed],
          ephemeral: true,
        });
      }
      if (selectTargetValue === "bot") {
        const botembed = new EmbedBuilder()
          .setTitle("`🤖` • Server Bots")
          .setColor("Purple")
          .setDescription(
            "» Hier könnt ihr sehen welche **Aufgaben unsere wichtigsten Bots** haben."
          )
          .addFields([
            {
              name: `> \`🔰\` » Moderation`,
              value: `**Aufgaben:** Tickets, Moderation`,
            },
            {
              name: `> \`⚒️\` » Partner`,
              value: `**Aufgaben:** Partner managment`,
            },
            {
              name: `> \`⚙️\` » System`,
              value: `**Aufgaben:** Level, Fun, Changelog, Vorschläge, Util`,
            },
          ]);
        interaction.reply({
          embeds: [botembed],
          ephemeral: true,
        });
      }
      if (selectTargetValue === "exklusive") {
        const exklusivembed = new EmbedBuilder()
          .setTitle("`💫` • Exklusive Rollen")
          .setColor("Yellow")
          .setDescription(`» Hier könnt ihr unsere **Exklusiven Rollen** sehen.\n \n> \`🚀\` » ${guild.roles.cache.get("1000688034670448701")} • \`${boosterd.members.size} 👥\`\nRang freischalten: **Booste diesen Server!**\n\n> \`💛\` » ${guild.roles.cache.get("957191592345759795")} • \`${partner.members.size} 👥\`\nRang freischalten: **Sei ein Partner von Unserem Server!**`)
          .setImage(
            "https://cdn.discordapp.com/attachments/967522063944392704/1113906240574197830/Exklusive_Rollen.png"
          );
        interaction.reply({
          embeds: [exklusivembed],
          ephemeral: true,
        });
      }
    }
  }
};
