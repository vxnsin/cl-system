const { SlashCommandBuilder } = require("discord.js");
const afkSchema = require("../../schemas/afk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("🅰️ • Zeige Usern, dass du AFK bist")
    .addStringOption((option) =>
      option
        .setName("grund")
        .setDescription("🅰️ • Warum bist du afk")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const afkData2 = await afkSchema.findOne();
    if (!afkData2 || !afkData2.enabled) {
      return interaction.reply({
        content: `\`❌\` • Das AFK System ist deaktiviert`,
        ephemeral: true,
      });
    }
    const grund = interaction.options.getString("grund");
    const userId = interaction.user.id;
    const member = interaction.member;

    const afkData = await afkSchema.findOneAndDelete({ userId: userId });

    if (afkData) {
      const reply = await interaction.reply(
        `<:greenAFK:1099703715994279986> | <@${interaction.user.id}> **ist wieder da!**\n> AFK-Status wurde entfernt.`
      );
      setTimeout(() => {
        reply.delete();
      }, 10000); // 10 Sekunden Verzögerung (10000 Millisekunden)
    } else {
      const newAfkData = new afkSchema({
        userId: userId,
        afk: true,
        reason: grund,
        nickname: interaction.member.displayName,
        startTime: new Date(),
      });
      await newAfkData.save();
      member.setNickname(`AFK | ${member.displayName}`);
      const reply = await interaction.reply(
        `<:AFK:998236373410660382> | <@${interaction.user.id}> **ist nun abwesend** <a:Neuigkeiten:998236221132259429>\n> ${grund}`
      );
      setTimeout(() => {
        reply.delete();
      }, 10000); 
    }
  },
};
