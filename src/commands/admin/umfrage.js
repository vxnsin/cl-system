const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../../umfrage.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("umfrage")
    .setDescription("📑 • Starte eine Umfrage")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("frage")
        .setDescription("🤔 • Welche Frage")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("optionen")
        .setDescription("🗝️ • Optionen getrennt durch Komma!")
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("frage");
    const options = interaction.options.getString("optionen").split(",");

    const data = {
      question,
      options,
      votes: Array(options.length).fill(0),
    };

    let polls = [];
    try {
      const jsonData = fs.readFileSync(jsonFilePath, "utf8");
      if (jsonData) {
        polls = JSON.parse(jsonData);
      }
    } catch (error) {
      console.error("Fehler beim Lesen der JSON-Datei:", error);
    }

    polls = data;

    try {
      const jsonData = JSON.stringify(polls, null, 2);
      fs.writeFileSync(jsonFilePath, jsonData, "utf8");
      console.log("Umfrage wurde in der JSON-Datei gespeichert.");
    } catch (error) {
      console.error("Fehler beim Schreiben der JSON-Datei:", error);
    }

    const embed = new EmbedBuilder().setColor("#0099ff").setTitle(question);

    const row = new ActionRowBuilder().addComponents(
      options.map((option, index) =>
        new ButtonBuilder()
          .setCustomId(`option_${index + 1}`)
          .setLabel(`${option}`)
          .setStyle(1)
      )
    );

    await interaction.reply({
      content: "**Eine neue Umfrage**",
      embeds: [embed],
      components: [row],
    });
  },
};
