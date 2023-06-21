const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const kisses = [
  "https://media1.tenor.com/images/04c894c51f70dd24acd59ec5392a1584/tenor.gif?itemid=12720024",
  "https://media1.tenor.com/images/45e529c116a1758fd09bdb27e2172eca/tenor.gif?itemid=11674749",
  "https://media1.tenor.com/images/31362a548dc7574f80d01a42a637bc93/tenor.gif",
  "https://media1.tenor.com/images/5c712c9fc3f17b1735a36b8ec65996ba/tenor.gif?itemid=12535181",
  "https://media3.giphy.com/media/xUOwGeHJEQ46pdsvWE/giphy.gif",
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("😚 • Küsse jemanden")
    .addUserOption((option) =>
      option
        .setName("mitglied")
        .setDescription("😚 • Welchen User möchtest du küssen?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const huguser = options.getUser("mitglied");

    if (huguser.id == interaction.user.id) {
      return await interaction.reply({
        content:
          "`❌` • Du kannst dich nicht Selbst küssen, also schon aber **ne**",
        ephemeral: true,
      });
    }
    if (huguser.bot == true) {
      return await interaction.reply({
        content: "`❌` • Du kannst nicht mit ein Bot rummachen",
        ephemeral: true,
      });
    }
    return interaction.reply({content: `${huguser}`,
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setImage(kisses[Math.floor(Math.random() * kisses.length)])
          .setDescription(`<@${interaction.user.id}> hat ${huguser} geküsst`),
      ],
    });
  },
};
