const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const hugs = [
  "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
  "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
  "https://media.giphy.com/media/LIqFOpO9Qh0uA/giphy.gif",
  "https://media.tenor.com/UUDWXyIeKvkAAAAC/hug.gif",
  "https://media.tenor.com/dI_LcyWYuLMAAAAC/hug-anime.gif",
  "https://media.tenor.com/LAyPORbxIQsAAAAC/hug.gif",
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("🤗 • Umarme einen Freund")
    .addUserOption((option) =>
      option
        .setName("mitglied")
        .setDescription("🫂 • Welchen User möchtest du umarmen?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const huguser = options.getUser("mitglied");

    if (huguser.id == interaction.user.id) {
      return await interaction.reply({
        content:
          "`❌` • Du kannst dich nicht Selbst küssen, also schon aber **ne**",
        ephemeral: true,
      });
    }
    if (huguser.bot == true) {
      return await interaction.reply({
        content: "`❌` • Du kannst nicht mit ein Bot rummachen",
        ephemeral: true,
      });
    }

    return interaction.reply({content: `${huguser}`,
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setImage(hugs[Math.floor(Math.random() * hugs.length)])
          .setDescription(
            `<@${interaction.user.id}> hat ${huguser} umarmt! So Putzig`
          ),
      ],
    });
  },
};
