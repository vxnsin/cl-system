const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Pfad zur JSON-Datei
const jsonFilePath = path.join(__dirname, "../../changelog.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-news-add")
    .setDescription("➕ • Füge was zu den Changelogs hinzu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("kategorie")
        .setDescription(
          "🤔 • Wähle aus, bei welchem Service etwas geändert wurde."
        )
        .setRequired(true)
        .addChoices(
          { name: "Moderation (🤖)", value: "moderation" },
          { name: "Security (🤖)", value: "security" },
          { name: "Partner (🤖)", value: "partner" },
          { name: "Gift (🤖)", value: "gift" },
          { name: "System (🤖)", value: "system" },
          { name: "Discord Server", value: "discord" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("🤖 • Wähle eine art des Updates aus")
        .setRequired(true)
        .addChoices(
          { name: "🔴 • Bug behoben/entfernt", value: "🔴" },
          { name: "🟠 • Änderung", value: "🟠" },
          { name: "🟡 • Wartungsarbeiten", value: "🟡" },
          { name: "🟢 • Neu hinzugefügt", value: "🟢" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("update")
        .setDescription("📑 • Erzähle, was genau geändert wurde.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const kategorie = interaction.options.getString("kategorie");
    const emoji = interaction.options.getString("emoji");
    const update = interaction.options.getString("update");

    let changelogData = fs.readFileSync(jsonFilePath, "utf8");
    let changelog = JSON.parse(changelogData);

    // Überprüfe, ob die changelog ein Arry ist
    if (!Array.isArray(changelog)) {
      changelog = [];
    }

    changelog.push({
      kategorie: kategorie,
      emoji: emoji,
      update: update,
    });

    fs.writeFileSync(jsonFilePath, JSON.stringify(changelog, null, 4), "utf8");

    await interaction.reply({content:"`✅` • Das Update wurde erfolgreich hinzugefügt.", ephemeral: true});
  },
};
