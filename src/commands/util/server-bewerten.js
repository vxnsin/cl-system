const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { bewertungschannel } = require("../../../config.json");

const serverBewertenSchema = require("../../schemas/serverbewerten");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-bewerten")
    .setDescription("⭐ • Bewerte unser Server")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("sterne")
        .setDescription("1 - 5 Sterne")
        .addChoices(
          { name: "⭐", value: "⭐" },
          { name: "⭐⭐", value: "⭐⭐" },
          { name: "⭐⭐⭐", value: "⭐⭐⭐" },
          { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
          { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("beschreibung")
        .setDescription("⭐ • Beschreibe was wir Besser machen können")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("anonym")
        .setDescription("⭐ • Möchtest du die Nachricht anonym senden?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const bewertenData = await serverBewertenSchema.findOne();
    if (!bewertenData || !bewertenData.enabled) {
      return interaction.reply({
        content: `\`❌\` • Das Server Bewerten System ist deaktiviert`,
        ephemeral: true,
      });
    }
    const { options, member } = interaction;

    const stars = options.getString("sterne");
    const description = options.getString("beschreibung");
    const anonym = options.getBoolean("anonym");

    const channel = member.guild.channels.cache.get(bewertungschannel);
    if (anonym == true) {
      const embed = new EmbedBuilder()
        .addFields(
          { name: "Sterne", value: `${stars}`, inline: true },
          { name: "Beschreibung", value: `${description}\n` }
        )
        .setColor("#A256FF")
        .setTimestamp();

      channel.send({ embeds: [embed] });
    }
    if (anonym == false) {
      const embed = new EmbedBuilder()
        .setTitle("Bewertung von " + interaction.user.tag)
        .addFields(
          { name: "Sterne", value: `${stars}`, inline: true },
          { name: "Beschreibung", value: `${description}\n` }
        )
        .setColor("#A256FF")
        .setTimestamp();

      channel.send({ embeds: [embed] });
    }

    return interaction.reply({
      content: `\`✅\` • Danke für deine Bewertung, die Bewertung wurde in: ${channel}. Gesendet!`,
      ephemeral: true,
    });
  },
};
