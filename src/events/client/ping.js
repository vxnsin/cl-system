const {
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: "messageCreate",
  
    async execute(message, client, interaction) {
      if (message.author.bot) return;
      if (message.content.includes("<@1089598900941357093"))  { //Bot ID
         
         try {
        const pingEmbed = new EmbedBuilder()
        
          .setColor("DarkerGrey")
          .setTitle("🏓 • Wer hat mich angepingt?")
          .setDescription(
            `Hey, ${message.author.username}!, hier sind Infos über mich.\nBei Hilfe **/help**`
          )
          
          .addFields({ name: `**💣 • Commands:**`, value: `${client.commands.size}`, inline: true},{
            name: `<:person:1077910061910851615> • Zuständig`,
            value: `> Ich bin der **Kern** des Server, Ich **unterstützte** viele Commands und **Systeme**.\n> **Ohne mich Läuft hier garnichts**`,
            inline: false,
          },
          {
            name: `<:djs:1077912060022771742> • Code Infos`,
            value: `<:djs:1077912060022771742> • v14 • <:nodejs:1077912480208146524> • v18`,
            inline: false,
          },)
          .setTimestamp()
          .setFooter({text: `Angefragt von ${message.author.username}.`});;
  
        
          return message.reply({ embeds: [pingEmbed]});
    } catch (err) {
      console.log("Fehler beim Lesen der Datei:", err);
    }
  }
}
}