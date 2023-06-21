const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const kills = [
  "https://media.tenor.com/36uJyk1Rv9EAAAAC/die-timetodie.gif",
  "https://media.tenor.com/WOpPM1NdBE4AAAAi/agung.gif",
  "https://media.tenor.com/Ik-kENFloS0AAAAS/pepega-pepe-the-frog.gif",
  "https://media.tenor.com/gH10RY-o29kAAAAC/pepe.gif",
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kill")
    .setDescription("☠️ • Töte jemanden")
    .addUserOption((option) =>
      option
        .setName("opfer")
        .setDescription("`🔪` • Wen möchtest du töten?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const opfer = options.getUser("opfer");

    if (opfer.id == interaction.user.id) {
      const embedselfkill = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("`🔪` • Mord begangen")
        .setDescription(`${interaction.user} hat Selbst mord begannen. R.I.P`)
        .setImage(kills[Math.floor(Math.random() * kills.length)]);
      return await interaction.reply({ embeds: [embedselfkill] });
    }
    if (opfer.bot) {
      return await interaction.reply({
        content: "`❌` • Du kannst kein Bot töten!",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("`🔪` • Mord begangen")
      .setDescription(`${interaction.user} hat ${opfer} getötet! R.I.P.`)
      .setImage(kills[Math.floor(Math.random() * kills.length)]);

    return interaction.reply({content: `${opfer}`, embeds: [embed] });
  },
};
