const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Level = require("../../schemas/level");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("🏆 • Rufe das Level Leaderboard ab"),

  async execute(interaction, client) {
    const topUsers = await Level.find({}).sort({ level: -1, xp: -1 }).limit(10);

    const leaderboardEmbed = new EmbedBuilder()
      .setTitle("Top 10 Leaderboard")
      .setDescription("Emoji | Name | Level | XP\n \n" +
        topUsers
          .map((user, index) => {
            const rankEmojis = [
              "🥇",
              "🥈",
              "🥉",
              "4️⃣",
              "5️⃣",
              "6️⃣",
              "7️⃣",
              "8️⃣",
              "9️⃣",
              "🔟",
            ];
            const rankEmoji = rankEmojis[index] || "➖";
			const guildId = user.guildId;
        	const userId = user.userId;
              
            const guild = client.guilds.cache.get(guildId);
        	const member = guild?.members.cache.get(userId);

            const name = member ? member.displayName : "Unbekannter Benutzer";
            const level = user.level;
            const xp = user.xp;
			
            return `\`${rankEmoji}\` | **${name}** | **${level}** | **${xp}**`;
          })
          .join("\n")
      )

      .setColor("Orange");

    interaction.reply({ embeds: [leaderboardEmbed] });
  },
};
