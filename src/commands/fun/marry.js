const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

// Define the schema for the marriage data
const marriageSchema = require("../../schemas/marrageSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("marry")
    .setDescription("💍 • Heirate einen User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("💍 • Welchen User möchtest du heiraten")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user1 = interaction.user.id;
    const user2 = interaction.options.getUser("user").id;

    const existierenteVerlobung = await marriageSchema.findOne({ user2 });
    const married = await marriageSchema.findOne({ user1 });
    if (existierenteVerlobung) {
      return interaction.reply("`❌` • Ihr 2 seit schon verlobt");
    } else if (married) {
      return interaction.reply(
        "`❌` • Dieser User ist bereits mit jemanden verlobt"
      );
    }

    if (user2.id == user1) {
      return await interaction.reply({
        content: "`❌` • Du kannst dich nicht Selbst heiraten.",
        ephemeral: true,
      });
    }
    if (user2.bot) {
      return await interaction.reply({
        content: "`❌` • Du kannst kein Bot heirraten!",
        ephemeral: true,
      });
    }

    const neueVerlobung = new marriageSchema({ user1, user2 });
    await neueVerlobung.save();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("accept")
        .setLabel("Ja")
        .setStyle("Success"),
      new ButtonBuilder()
        .setCustomId("deny")
        .setLabel("Nein")
        .setStyle("Danger")
    );

    const marriageEmbed = new EmbedBuilder()
      .setTitle("`💍` • Heiratsantrag")
      .setDescription(
        `<@${
          interaction.user.id
        }> hat sich vor dich gekniet und dir ein Ring gegeben und gefragt, ob du (sie • ihn) heiraten möchtest? **Sagst du Ja oder Nein** <@${
          interaction.options.getUser("user").id
        }>`
      );

    await interaction.reply({ embeds: [marriageEmbed], components: [row] });

    const filter = (i) => i.user.id === user2;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "accept") {
        await marriageSchema.findOneAndUpdate(
          { user1, user2 },
          { accepted: true }
        );
        const acceptedEmbed = new EmbedBuilder()
          .setTitle("`💍` • Heiratsantrag")
          .setDescription(
            `<@${user2}> hat **Ja** gesagt, So Süß die Beiden. Wir wünschen euch Viel Glück. :tada:`
          );
        await i.reply({ embeds: [acceptedEmbed] });
      } else if (i.customId === "deny") {
        await marriageSchema.findOneAndDelete({ user1, user2 });
        const deniedEmbed = new EmbedBuilder()
          .setTitle("`💍` • Heiratsantrag")
          .setDescription(
            `<@${user2}> hat **Nein** gesagt, Schade. :broken_heart:`
          );
        await i.reply({ embeds: [deniedEmbed] });
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        marriageSchema.findOneAndDelete({ user1, user2 });
        const timeoutEmbed = new EmbedBuilder()
          .setTitle("`💍` • Heiratsantrag")
          .setDescription(`<@${user2}> ist anscheinend AFK. Bruh :hourglass:`);
        interaction.editReply({ embeds: [timeoutEmbed], components: [] });
      }
    });
  },
};
