const { SlashCommandBuilder } = require("@discordjs/builders");
const emojischema = require("../../schemas/emoji");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setemoji")
    .setDescription("🎭 • Setze ein Emoji")
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("🎭 • Wähle ein Emoji aus")
        .setRequired(true)
    ),

  async execute(interaction) {
    const emoji = interaction.options.getString("emoji");
    const userId = interaction.user.id;

    try {
      const existingEmoji = await emojischema.findOne({ userId });
      if (existingEmoji) {
        existingEmoji.emoji = emoji;
        await existingEmoji.save();
      } else {
        const newEmoji = new emojischema({ userId, emoji });
        await newEmoji.save();
      }
      await interaction.reply(`${emoji} • Emoji wurde gesetzt.`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Ein Fehler ist aufgetreten.");
    }
  },
};
