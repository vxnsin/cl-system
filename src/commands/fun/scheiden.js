const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const marriageSchema = require("../../schemas/marrageSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scheiden")
    .setDescription("💔 • Trenne dich von dein Verlobten")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription(
          "💔 • Von welchen user möchtest du dich Scheiden lassen"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const user1 = interaction.user.id;
    const user2 = interaction.options.getUser("user")?.id;

    const existingMarriage = await marriageSchema.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
    });
    if (!existingMarriage) {
      return interaction.reply("`❌` • Du bist nicht verheiratet");
    }

    await marriageSchema.findByIdAndRemove(existingMarriage._id);

    const divorceEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Die Ehe ist gebrochen")
      .setDescription(
        `\`💔\` ${interaction.options.getUser("user").username}!`
      );
    await interaction.reply({ embeds: [divorceEmbed] });
  },
};
