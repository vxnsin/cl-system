const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const welcomeSchema = require("../../schemas/welcome");
const spielersucheSchema = require("../../schemas/spielersuche");
const levelsystemschema = require("../../schemas/level");
const afkSchema = require("../../schemas/afk");
const serverbewertenSchema = require("../../schemas/serverbewerten");
const deathchatping = require("../../schemas/deathchat");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDescription("📃 • Schalte Funktionen ein und aus")
    .addStringOption((option) =>
      option
        .setName("einstellung")
        .setDescription("📃 • Wähle eine Funktion")
        .setRequired(true)
        .addChoices(
          { name: "👋 • Willkommen", value: "👋" },
          { name: "🔎 • Spieler Suche", value: "🔎" },
          { name: "➡️ • Level System", value: "➡️" },
          { name: "😴 • Afk System", value: "😴" },
          { name: "⭐ • Server Bewerten", value: "⭐" },
          { name: "💀 • Death Chat Ping", value: "💀" }
        )
    )
    .addBooleanOption((option) =>
      option.setName("enabled").setDescription("Ein • Aus").setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;
    const isEnabled = options.getBoolean("enabled");
    const kategorie = options.getString("einstellung").toLowerCase();

    switch (kategorie) {
      case "👋":
        await welcomeSchema.findOneAndUpdate(
          {},
          { enabled: isEnabled },
          { upsert: true }
        );

        if (isEnabled) {
          await interaction.reply(
            "`✅` • Die Willkommensnachricht wurde aktiviert."
          );
        } else {
          await interaction.reply(
            "`❌` • Die Willkommensnachricht wurde deaktiviert."
          );
        }
        break;
      case "🔎":
        await spielersucheSchema.findOneAndUpdate(
          {},
          { enabled: isEnabled },
          { upsert: true }
        );

        if (isEnabled) {
          await interaction.reply("`✅` • Die Spielersuche wurde aktiviert.");
        } else {
          await interaction.reply("`❌` • Die Spielersuche wurde deaktiviert.");
        }
        break;
      case "➡️":
        await levelsystemschema.findOneAndUpdate(
          {},
          { enabled: isEnabled },
          { upsert: true }
        );

        if (isEnabled) {
          await interaction.reply("`✅` • Das Level System wurde aktiviert.");
        } else {
          await interaction.reply("`❌` • Das Level System wurde deaktiviert.");
        }
        break;
      case "😴":
        await afkSchema.findOneAndUpdate(
          {},
          { enabled: isEnabled },
          { upsert: true }
        );

        if (isEnabled) {
          await interaction.reply("`✅` • Das AFK System wurde aktiviert.");
        } else {
          await interaction.reply("`❌` • Das AFK System wurde deaktiviert.");
        }
        break;
      case "⭐":
        await serverbewertenSchema.findOneAndUpdate(
          {},
          { enabled: isEnabled },
          { upsert: true }
        );

        if (isEnabled) {
          await interaction.reply(
            "`✅` • Das Server Bewerten System wurde aktiviert."
          );
        } else {
          await interaction.reply(
            "`❌` • Das Server Bewerten System wurde deaktiviert."
          );
        }
        break;
        case "💀":
          await deathchatping.findOneAndUpdate(
            {},
            { enabled: isEnabled },
            { upsert: true }
          );
  
          if (isEnabled) {
            await interaction.reply(
              "`✅` • Der Death Chat Ping wurde aktiviert."
            );
          } else {
            await interaction.reply(
              "`❌` • Der Death Chat Ping wurde deaktiviert."
            );
          }
          break;
    }
  },
};
