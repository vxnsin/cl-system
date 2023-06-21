const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const marriageSchema = require("../../schemas/marrageSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("checkmarry")
    .setDescription("💍 • Überprüfe ob du bereits verheiratet bist"),
  async execute(interaction) {
    const authorId = interaction.user.id;

    const existierenteVerlobung = await marriageSchema.findOne({
      $or: [{ user1: authorId }, { user2: authorId }],
    });
    if (!existierenteVerlobung) {
      return interaction.reply("`❌` • Du bist nicht verheiratet");
    }

    const checkID =
      existierenteVerlobung.user1 === authorId
        ? existierenteVerlobung.user2
        : existierenteVerlobung.user1;

    const verlobtUser = await interaction.client.users.fetch(checkID);

    const marriageEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("`💍` • Verlobt")
      .setDescription(`Du bist mit ${verlobtUser.username} verheiratet!`);
    await interaction.reply({ embeds: [marriageEmbed] });
  },
};
