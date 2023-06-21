const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const guildId = interaction.guild.id;
	  const guild = client.guilds.cache.get(guildId);

    if (interaction.values && interaction.values.length > 0) {
      const selectTargetValue = interaction.values[0];

      if (selectTargetValue === "allgemeine_de") {
        const erfolgeembed = new EmbedBuilder()
          .setTitle("<a:Neuigkeiten:998236221132259429> • Allgemeine Fragen")
          .setColor("Orange")
          .setDescription(``)
        interaction.reply({
          embeds: [erfolgeembed],
          ephemeral: true,
        });
      }
    }
  }
};
