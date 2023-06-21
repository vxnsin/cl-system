const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
  Colors,
  EmbedBuilder,
} = require("discord.js");
const { vorschlagchannel } = require("../../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vorschlag-reject")
    .setDescription("❌ • Lehne einen Vorschlag ab.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("messagid")
        .setDescription("ID der Vorschlagsnachricht")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("grund")
        .setDescription("Gebe einen Grund an")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const grund = interaction.options.getString("grund");

    const messageId = interaction.options.getString("messagid");

    const channel = client.channels.cache.get(vorschlagchannel);
    const message = await channel.messages.fetch(messageId);

    const reactions = message.reactions.cache;

    const thumbsUp = reactions.get("👍");
    const thumbsDown = reactions.get("👎");

    const thumbsUpCount = thumbsUp ? thumbsUp.count - 1 : 0;
    const thumbsDownCount = thumbsDown ? thumbsDown.count - 1 : 0;

    const vorschlagsembed = message.embeds[0];

    const embed = new EmbedBuilder();
    embed.setColor("Red");
    embed.setTitle(vorschlagsembed.title);
    embed.setTitle(vorschlagsembed.description);
    embed.setAuthor({
      name: `Abgelehnt von ${interaction.member.user.tag}`,
      iconURL: interaction.member.user.displayAvatarURL(),
      url: `https://discordapp.com/users/${interaction.member.user.id}`,
    });
    embed.addFields([
      {
        name: "`🚪` • Status",
        value:
          "› Dieser Vorschlag wurde vom Team abgelehnt.\n**Grund:** `" +
          grund +
          "`",
      },
      {
        name: "`📊` • **Community-Voting**",
        value: `» IHR habt abgestimmt: ${thumbsUpCount} \`👍\` • ${thumbsDownCount} \`👎\``,
      },
    ]);
    embed.setThumbnail("https://i.imgur.com/kgcY5rF.png");
    embed.setImage(
      "https://cdn.discordapp.com/attachments/967522063944392704/1113906720008310894/Server_Idee_Abgelehnt_Banner.png"
    );

    await message.edit({ embeds: [embed] });

    if (thumbsUp) {
      await thumbsUp.remove();
    }

    if (thumbsDown) {
      await thumbsDown.remove();
    }

    await interaction.reply({
      content: "`❌` • Der Vorschlag wurde abgelehnt",
      ephemeral: true,
    });
  },
};
