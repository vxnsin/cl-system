const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const { vorschlagchannel } = require("../../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("vorschlag")
    .setDescription("💡 • Schlage einen neuen Vorschlag vor.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("📛 • Name des Vorschlags")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("beschreibung")
        .setDescription("📑 • Beschreibung des Vorschlags")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const name = interaction.options.getString("name");
    const beschreibung = interaction.options.getString("beschreibung");

    const embed = new EmbedBuilder()
      .setColor(Colors.Orange)
      .setTitle(`\`🔎\` **- ${name}**`)
      .setDescription(`⠀\n> ${beschreibung}\n⠀\n**─────────────────────────**`)
      .setThumbnail("https://i.imgur.com/emyqXev.png")
      .setImage(
        "https://cdn.discordapp.com/attachments/967522063944392704/1113906759648686150/Neuer_Vorschlag_Banner.png"
      )
      .addFields([
        {
          name: `\`💡\` **- Vorschläge**`,
          value: `> Nutze **/vorschlag** um ein Vorschlag einzureichen`,
        },
      ])
      .setFooter({
        text:
          "Eingereicht von " +
          interaction.member.user.tag +
          " • " +
          interaction.member.user.id,
        iconURL: interaction.member.user.displayAvatarURL(),
      });

    const channel = client.channels.cache.get(vorschlagchannel);
    const message = await channel.send({ embeds: [embed] });

    await message.react("👍");
    await message.react("👎");

    await interaction.reply({
      content: "`💡` • Dein Vorschlag wurde eingereicht",
      ephemeral: true,
    });
  },
};
