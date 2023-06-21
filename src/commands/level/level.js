const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
const xpRechner = require("../../utils/xprechner");
const Level = require("../../schemas/level");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("level")
    .setDescription("🏆 • Rufe das Level eines User ab")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("🥇 • Welcher User")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const mentionedUserId = interaction.options.get("user")?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.reply(
        mentionedUserId
          ? `\`❌\` • ${targetUserObj.user.tag} hat derzeit kein Level.`
          : "`❌` • Du hast noch kein Level."
      );
      return;
    }

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
      "-_id userId level xp"
    );

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank =
      allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

    const rank = new canvacord.Rank()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(xpRechner(fetchedLevel.level))
      .setStatus(targetUserObj.presence.status)
      .setProgressBar("#ffffff", "COLOR")
      .setUsername(targetUserObj.user.username)
      .setDiscriminator(targetUserObj.user.discriminator);

    const data = await rank.build();
    const attachment = new AttachmentBuilder(data);
    interaction.reply({ files: [attachment] });
  },
};
