const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const levelSchema = require("../../schemas/level");
const xpRechner = require("../../utils/xprechner");

function calculateLevel(xp) {
    return Math.floor(Math.pow(2, xp / 100));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("🏆 • Füge oder Entferne XP")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) =>
      option
        .setName("aktion")
        .setDescription("🏆 • Hinzufügen oder Entfernen")
        .setRequired(true)
        .addChoices(
          { name: "➕ • Hinzufügen", value: "add" },
          { name: "➖ • Entfernen", value: "remove" }
        )
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("📛 • Wähle einen User aus").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("anzahl").setDescription("🔢 • Anzahl der XP").setRequired(true)
    ),
  async execute(interaction, client) {
    const { guildId, options, channel } = interaction;

    const aktion = options.getString("aktion");
    const member = options.getUser("user");
    const anzahl = options.getInteger("anzahl");

    const embed = new EmbedBuilder();

    switch (aktion) {
      case "add":
        levelSchema.findOne({ userId: member.id, guildId: guildId }, async (err, data) => {
          if (err) throw err;
          if (!data) {
            data = new levelSchema({
              userId: member.id,
              guildId: guildId,
              xp: 0,
              level: 0,
            });
          }

          data.xp += anzahl;
          const newLevel = calculateLevel(data.xp);
          if (newLevel > data.level) {
            // Der Benutzer hat ein Level-Up erreicht
            data.level = newLevel;
            interaction.reply({
              embeds: [
                embed
                  .setColor("Green")
                  .setDescription(
                    `✅ | Dem Benutzer ${member} wurden **${anzahl} XP** hinzugefügt. Herzlichen Glückwunsch zum Level ${newLevel}!`
                  ),
              ],
            });
          } else {
            interaction.reply({
              embeds: [
                embed
                  .setColor("Green")
                  .setDescription(
                    `✅ | Dem Benutzer ${member} wurden **${anzahl} XP** hinzugefügt. Aktuelles Level: ${data.level}`
                  ),
              ],
            });
          }

          data.save();
        });
        break;

      case "remove":
        levelSchema.findOne({ userId: member.id, guildId: guildId }, async (err, data) => {
          if (err) throw err;
          if (!data) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    "`❌` | Es ist ein **Fehler** aufgetreten!"
                  ),
              ],
              ephemeral: true,
            });
          }

          if (anzahl > data.xp) {
            return interaction.reply({
              embeds: [
                embed
                  .setColor("Red")
                  .setDescription(
                    "`❌` | Der Benutzer hat nicht genug XP, um entfernt zu werden."
                  ),
              ],
            });
          }

          data.xp -= anzahl;
          const newLevel = calculateLevel(data.xp);
          if (newLevel < data.level) {
            // Der Benutzer hat ein Level abgesenkt
            data.level = newLevel;
            interaction.reply({
              embeds: [
                embed
                  .setColor("Green")
                  .setDescription(
                    `✅ | Dem Benutzer ${member} wurden **${anzahl} XP** entfernt. Das Level wurde auf ${newLevel} herabgesetzt.`
                  ),
              ],
            });
          } else {
            interaction.reply({
              embeds: [
                embed
                  .setColor("Green")
                  .setDescription(
                    `✅ | Dem Benutzer ${member} wurden **${anzahl} XP** entfernt. Aktuelles Level: ${data.level}`
                  ),
              ],
            });
          }

          data.save();
        });
        break;

      default:
        break;
    }
  },
};
