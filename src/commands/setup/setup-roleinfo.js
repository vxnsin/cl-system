const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-role")
    .setDescription(
      "🛠️ • Sende eine Embed mit ein Select Menu  um die Rollen Informationen zu sehen"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "🛠️ • In Welchen Channel soll die Nachricht gesendet werden"
        )
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction, client) {
    const { channel, guild, options } = interaction;

    const sendChannel = options.getChannel("channel") || channel;

    const roleinfoselect = new StringSelectMenuBuilder()
      .setCustomId("roleinfo")
      .setPlaceholder("📚 » ROLLEN - INFORMATIONEN")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("SERVER - ERFOLGE")
          .setDescription("» Einzigartige Server Erfolge")
          .setEmoji("🏆")
          .setValue("erfolge"),
        new StringSelectMenuOptionBuilder()
          .setLabel("MITGLIEDER - RÄNGE (Soon)")
          .setEmoji("👤")
          .setDescription("» Hier sind ALLE Spieler-Ränge aufgelistet.")
          .setValue("spieler"),
        new StringSelectMenuOptionBuilder()
          .setLabel("EXKLUSIVE - ROLLEN")
          .setDescription("» Besondere Ränge mit besonderen Vorteilen.")
          .setEmoji("💫")
          .setValue("exklusive"),
        new StringSelectMenuOptionBuilder()
          .setLabel("TEAM - RÄNGE")
          .setDescription("» Sieh dir die Aufgaben des Teams an.")
          .setEmoji("🏢")
          .setValue("team"),
        new StringSelectMenuOptionBuilder()
          .setLabel("BOT - ROLLEN")
          .setDescription("» Sieh dir die Aufgaben unserer Bots an.")
          .setEmoji("🤖")
          .setValue("bot")
      );

    const row = new ActionRowBuilder().addComponents(roleinfoselect);

    const roleinfoembed = new EmbedBuilder()
      .setTitle("`🏆` 𑁉 **Erhalte neue Ränge & einzigartige Erfolge!**")
      .setDescription(
        "» Hier findest du alle Informationen über die meisten Ränge auf unserem Server und dessen Vorteile, Anforderungen und/oder Aufgaben.\n \n`📌` » Klicke auf eine Kategorie, um dir die Listen anzusehen!\n`🚑` » Öffne ein Ticket im Support bei Fragen oder Problemen."
      )
      .setColor("Orange")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/979034759613255700/1022873748250034276/levels.png"
      );

    await sendChannel.send({
      embeds: [roleinfoembed],
      components: [row],
    });
    interaction.reply({
      content: "`✅` • Rollen Info wurde gesendet",
      ephemeral: true,
    });
  },
};
