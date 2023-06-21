const { SlashCommandBuilder, PermissionFlagsBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Pfad zur JSON-Datei
const jsonFilePath = path.join(__dirname, "../../changelog.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot-news-remove")
    .setDescription("🗑️ • Lösche Einträge aus den Changelogs")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction, client) {
    let changelogData = fs.readFileSync(jsonFilePath, "utf8");
    let changelog = JSON.parse(changelogData);

    const selectMenuOptions = changelog.map((entry, index) => {
      return new StringSelectMenuOptionBuilder()
        .setLabel(`${entry.kategorie} - ${entry.emoji} ${entry.update}`)
        .setValue(`option_${index}`);
    });

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("changelog_remove")
      .setPlaceholder("Wähle ein Update aus der Liste")
      .addOptions(selectMenuOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: "`⏳` • Wähle ein Update aus der Liste, das gelöscht werden soll.",
      ephemeral: true,
      components: [row],
    });

    const selectMenuInteraction = await interaction.channel.awaitMessageComponent({
      filter: i => i.customId === "changelog_remove" && i.user.id === interaction.user.id,
      time: 15000,
    });

    if (selectMenuInteraction) {
      const selectedValue = selectMenuInteraction.values[0];
      const selectedIndex = parseInt(selectedValue.split("_")[1]);
      const selectedUpdate = changelog[selectedIndex].update;

      // Entferne den Eintrag aus dem Changelog
      changelog.splice(selectedIndex, 1);

      fs.writeFileSync(jsonFilePath, JSON.stringify(changelog, null, 2));

      await selectMenuInteraction.reply({
        content: `\`✅\` • Der Changelog-Eintrag "${selectedUpdate}" wurde erfolgreich gelöscht.`,
        ephemeral: true,
      });
    }  else {
      await interaction.editReply({
        content: "`❌` • Es wurde keine Auswahl getroffen.",
        ephemeral: true,
      });
    }
  },
};
