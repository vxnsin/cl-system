const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Pfad zur JSON-Datei
const jsonFilePath = path.join(__dirname, "../../changelog.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-news-list")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDescription("📄 • Zeigt eine Liste der aktuellen Updates an."),
  async execute(interaction) {
    // Lese die Daten aus der JSON-Datei
    let changelogData = fs.readFileSync(jsonFilePath, "utf8");
    let changelog = JSON.parse(changelogData);

    // Überprüfe, ob die changelog ein Array ist und mindestens ein Update enthält
    if (Array.isArray(changelog) && changelog.length > 0) {
      // Erstelle ein Objekt, um die Updates nach Kategorien zu gruppieren
      let updatesByCategory = {};

      // Gruppiere die Updates nach Kategorien
      changelog.forEach((entry) => {
        const { kategorie, emoji, update } = entry;
        if (!updatesByCategory[kategorie]) {
          updatesByCategory[kategorie] = [];
        }
        updatesByCategory[kategorie].push(`> \`${emoji}\` • ${update}`);
      });

      // Erstelle die Embed-Nachricht
      const embed = new EmbedBuilder().setColor("#F1C40F").setTitle("Aktuelle Updates");

      // Füge die Kategorien und Updates zur Embed-Nachricht hinzu
      Object.keys(updatesByCategory).forEach((kategorie) => {
        const updates = updatesByCategory[kategorie];
        embed.addFields({name: kategorie, value: updates.join("\n") || "> Kein Eintrag"});
      });

      // Sende die Embed-Nachricht
      await interaction.reply({ embeds: [embed] });
    } else {
      // Sende eine Nachricht, wenn keine Updates gefunden wurden
      await interaction.reply("`❌` • Es sind keine aktuellen Updates verfügbar.");
    }
  },
};
