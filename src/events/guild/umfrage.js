const { EmbedBuilder, Embed } = require("discord.js");
const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../../umfrage.json");
const votedUsersFilePath = path.join(__dirname, "../../votedUsers.json");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    let poll = null;
    try {
      const jsonData = fs.readFileSync(jsonFilePath, "utf8");
      if (jsonData) {
        poll = JSON.parse(jsonData);
      }
    } catch (error) {
      console.error("Fehler beim Lesen der JSON-Datei:", error);
    }

    if (!poll) return;

    let votedUsers = [];
    try {
      const jsonData = fs.readFileSync(votedUsersFilePath, "utf8");
      if (jsonData) {
        votedUsers = JSON.parse(jsonData);
        if (!Array.isArray(votedUsers)) {
          votedUsers = [];
        }
      }
    } catch (error) {
      console.error("Fehler beim Lesen der votedUsers.json:", error);
    }

    const userVote = votedUsers.find(
      (userVote) =>
        userVote.messageId === interaction.message.id &&
        userVote.userId === interaction.user.id
    );
    if (userVote) {
      return interaction.reply({
        content: "Du hast bereits abgestimmt!",
        ephemeral: true,
      });
    }

    const optionIndex = parseInt(interaction.customId.split("_")[1]) - 1;
    if (
      isNaN(optionIndex) ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    )
      return;

    const newUserVote = {
      messageId: interaction.message.id,
      userId: interaction.user.id,
      optionIndex: optionIndex,
    };
    votedUsers.push(newUserVote);
    try {
      const jsonData = JSON.stringify(votedUsers, null, 2);
      fs.writeFileSync(votedUsersFilePath, jsonData, "utf8");
    } catch (error) {
      console.error("Fehler beim Schreiben der votedUsers.json:", error);
    }

    if (!Array.isArray(poll.options)) {
      console.error("Die Umfrageoptionen sind kein Array.");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(poll.question);

    const totalVotes = votedUsers.filter(
      (userVote) => userVote.messageId === interaction.message.id
    ).length;
    const progressBar = poll.options.map((option, index) => {
      const voteCount = votedUsers.filter(
        (userVote) =>
          userVote.messageId === interaction.message.id &&
          userVote.optionIndex === index
      ).length;
      const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
      const bar = "█".repeat(Math.floor(percentage / 10));
      return `${option} - ${bar} ${percentage.toFixed(2)}%`;
    });

    embed.addFields({ name: "`⏳` • Stimmen", value: progressBar.join("\n") });

    await interaction.update({ embeds: [embed] });
  },
};
