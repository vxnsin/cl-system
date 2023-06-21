const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendembed")
    .setDescription("🅰️ • Sende Embeds")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("embed")
        .setDescription("🅰️ • Wähle eine Embed aus")
        .setRequired(true)
        .addChoices(
          { name: "🤖 • Bots Verwenden", value: "🤖" },
          { name: "🔎 • Spieler Suche", value: "🔎" },
          { name: "⚒️ • Bewerben", value: "⚒️" },
          { name: "🤝 • Partner werden", value: "🤝" },
          { name: "🫂 • Ich bin neu hier", value: "🫂" },
        )
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("🅰️ • Wähle ein Channelf")
    ),

  async execute(interaction, client) {
    const { channel, guild, options } = interaction;

    const kategorie = options.getString("embed").toLowerCase();

    const sendChannel = options.getChannel("channel") || channel;

    switch (kategorie) {
      case "🤖":
        const botverwenden = new EmbedBuilder()
          .setTitle("`🤖` | Verwende oder teste unsere Discord-Bots!")
          .setDescription(
            "» In diesem Kanal kannst du **alle Bots** Verwenden, welche auf **diesem Server** sind."
          )
          .addFields([
            {
              name: "> `🚨` **» UNSERE EIGENEN BOTS!**",
              value: "`/help` » Zeigt dir Befehle von unseren CL-Bots.",
            },
            {
              name: "> `🤖` **» SONSTIGE BOTS!*/",
              value:
                "`!rank` » Rufe dein aktuelles Server-Level ab.\n`!remember-birthday Monat/Tag` » Setze deinen Geburtstag.",
            },
          ])
          .setImage(
            "https://cdn.discordapp.com/attachments/923982650971156551/1096785718963093514/red3_Bots_Verwenden_Banner_by_ToTo.png"
          )
          .setFooter({
            text: `🚑 » Öffne ein Ticket bei Fragen oder Problemen`,
          })
          .setColor("Orange");

        sendChannel.send({ embeds: [botverwenden] });
        interaction.reply("`✅` • Embed wurde gesendet");

        break;
      case "🔎":
        const spielersuche = new EmbedBuilder()
          .setTitle("`🔎` | Spieler Suche verwenden")
          .setDescription(
            "» In diesem Kanal kannst du nach **Mitspielern** suchen."
          )
          .addFields([
            {
              name: "> `🤔` **» Wie Funktioniert das System?**",
              value:
                "> Wenn du vor deiner Nachricht `Ich suche` oder `Suche` schreibst\nㅤ\n> Wir haben auch in unserem System eine Spiel erkennung bekannte Spiele wie **Minecraft oder Rocket League** werden erkannt und der Thread der erstellt wird dann nach dem Spiel benannt",
            },
            {
              name: "> `🧹` **» Nachrichten säuberung**",
              value:
                "> Gesendete Nachrichten werden automatisch nach **1 Woche gelöscht**.\n> **Damit der Channel aufgeräumt ist**",
            },
          ])
          .setFooter({
            text: `🚑 » Öffne ein Ticket bei Fragen oder Problemen`,
          })
          .setColor("Orange");

        sendChannel.send({ embeds: [spielersuche] });
        interaction.reply("`✅` • Embed wurde gesendet");

        break;
      case "⚒️":
        const teambewerbung = new EmbedBuilder()
          .setTitle(
            "<:ModeratorBadge:968871298728067082> **|** __**TEAM-BEWERBUNG - COMMUNITY LOUNGE**__ **|** <:ModeratorBadge:968871298728067082>"
          )
          .setDescription(
            "» Hier können sich **alle Mitglieder unseres Discord-Servers** für das **Server-Team bewerben.** Deine Vorteile und unsere Anforderungen **siehst du weiter unten.**"
          )
          .addFields([
            {
              name: "> `🏆` » __**Unsere Anforderungen:**__",
              value:
                "» Mindestens 14 Jahre alt.\n» Erfahrung mit unserem Discord Server Community Lounge.\n» Sympathisch, Hilfsbereit, Höflich & Geduldig.\n» Grundsätzliche Erfahrung mit Discord im Bereich **Support & Moderation**\n» Mindestens die <@&1088866219744047124> Rolle besitzen.\n» Grundkenntnisse von Discord ToS.",
            },
            {
              name: "> `🧹` » __**Deine Server-Aufgaben:**__",
              value: "» Tickets von Usern bearbeiten.\n» Server moderieren.",
              inline: true,
            },
            {
              name: "> `🔎` » __**Wenn du dich Bewerben möchtest:**__",
              value: "» Öffne ein Ticket in\n» <#935898701208100934>",
              inline: true,
            },
          ])
          .setImage(
            "https://cdn.discordapp.com/attachments/979034759613255700/998538194964455425/unknown.png"
          )
          .setFooter({
            text: `🚑 » Öffne ein Ticket bei Fragen oder Problemen`,
          })
          .setColor("Orange");

        sendChannel.send({ embeds: [teambewerbung] });
        interaction.reply("`✅` • Embed wurde gesendet");

        break;
      case "🤝":
        const partnerwerden = new EmbedBuilder()
          .setTitle("`💫` __**Partnerschaft**__ `💫`")
          .setDescription(
            "» Die Mitgliederanzahl bei einer Partnerschaft ist bei uns ab **50 Mitgliedern** akzeptabel.\n» Wir folgen ab **100 Mitgliedern** zurück, aber du darfst selber in den Partnerkanälen Werbung senden"
          )
          .addFields([
            {
              name: "> `🏆` » __**Voraussetzungen für eine Partnerschaft**__",
              value:
                "» Dein Server sollte aktiv sein\n» auf deinem Server wird **nicht unnötig gepingt**\n» Emojis von externen Servern sollte erlaubt sein\n» Ihr habt eine Partner Rolle, welche ich bekomme\n» **Euer Server hält sich an die Discord ToS**",
            },
            {
              name: "> `🫵` » __**Vorteile als Partner bei Community Lounge**__",
              value:
                "» Du bekommst Zugriff auf <#993086347185242183>\n» Du kannst in <#993084982752968746> schreiben\n» Du kannst aller 6 Stunden in <#993073058141179964> zusätzlich Werbung machen",
            },
            {
              name: "> `🔎` » __**Wie werde ich Partner?**__",
              value:
                "» Du musst <@1089599162296828016> auf dein Server einladen und den Command `/partner anfragen` ausführen der rest wird dann erklärt",
            },
          ])
          .setFooter({
            text: `🚑 » Öffne ein Ticket bei Fragen oder Problemen`,
          })
          .setColor("Orange");

        sendChannel.send({ embeds: [partnerwerden] });
        interaction.reply("`✅` • Embed wurde gesendet");

        break;
        case "🫂":
          const ichbinneuhier = new StringSelectMenuBuilder()
          .setCustomId("languagenew")
          .setPlaceholder("Sprache/Language")
          .addOptions(
            new StringSelectMenuOptionBuilder()
              .setLabel("Deutsch")
              .setEmoji("🇩🇪")
              .setValue("de"),
            new StringSelectMenuOptionBuilder()
              .setLabel("English")
              .setEmoji("🇺🇸")
              .setValue("us"),
          )
    
        const row = new ActionRowBuilder().addComponents(ichbinneuhier);
        const neuhier = new EmbedBuilder()
          .setDescription("🇩🇪 | Willkommen auf **Community Lounge**\n> **Bitte wähle unter diese Nachricht eine Sprache aus**\n \n🇺🇸 | Welcome to **Community Lounge**\n> **Please select a language under this message**")
          .setColor("Orange");

        sendChannel.send({ embeds: [neuhier], components: [row] });
        interaction.reply("`✅` • Embed wurde gesendet");

      default:
        break;
    }
  },
};