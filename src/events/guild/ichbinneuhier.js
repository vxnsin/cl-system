const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder  } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const guildId = interaction.guild.id;
	const guild = client.guilds.cache.get(guildId);

    if (interaction.values && interaction.values.length > 0) {
      const selectTargetValue = interaction.values[0];

      if (selectTargetValue === "de") {
        const helpde = new StringSelectMenuBuilder()
        .setCustomId("supporthelp")
        .setPlaceholder("📚 » Wähle ein Support-Thema!")
        .addOptions(
          new StringSelectMenuOptionBuilder() //Allgemeine Fragen
            .setLabel("Allgemeine Frage")
            .setDescription("» Hier sind ein paar Allgemein Fragen aufgelistet")
            .setEmoji("998236221132259429")
            .setValue("allgemeine_de"),
          new StringSelectMenuOptionBuilder() //Bots
            .setLabel("Unsere Bots")
            .setDescription("» Interesse für Unsere Bots?")
            .setEmoji("1113014958930808842")
            .setValue("bots_de"),
            new StringSelectMenuOptionBuilder() //Event / Gewinnspiele
            .setLabel("Event / Gewinnspiele")
            .setDescription("» Fragen zu Gewinnspielen")
            .setEmoji("968872330384277574")
            .setValue("gift_de"),
            new StringSelectMenuOptionBuilder() //Reporter
            .setLabel("Reporten")
            .setDescription("» Was tuhe Ich wenn jemand mist macht?")
            .setEmoji("1091020534621409430")
            .setValue("reporter_de"),
            new StringSelectMenuOptionBuilder() //Bewerbungsphase
            .setLabel("Bewerbungsphase")
            .setDescription("» Du willst dich bei uns Bewerben?")
            .setEmoji("1007275106810216598")
            .setValue("bewerben_de"),
            new StringSelectMenuOptionBuilder() //Rollenverwaltung
            .setLabel("Rollenverwaltung")
            .setDescription("» Rollen/Pings entfernen oder hinzufügen")
            .setEmoji("1091020534621409430")
            .setValue("rollen_de"),
            new StringSelectMenuOptionBuilder() //Level Belohnungen
            .setLabel("Level Belohnung")
            .setDescription("» Hole dir deine Belohnungen hier ab.")
            .setEmoji("1007275106810216598")
            .setValue("level_de"),
        )
        const rowde = new ActionRowBuilder().addComponents(helpde);
        const deembed1 = new EmbedBuilder()
          .setTitle("<:Members:968869264838758400> 𑁉 **DAS IST COMMUNITY LOUNGE - WILLKOMMEN!**")
          .setColor("Orange")
          .setDescription(`» \`👥\` | **Community Lounge** (wir) sind ein **allgemeiner & offener** Community **Discord Server**

> <a:Neuigkeiten:998236221132259429> 𑁉 **WAS KANN ICH HIER MACHEN?**
» Auf unserem Server gibt es **viel zu erledigen**, du wirst beim Erkunden Elemente finden, die bei Videospielen üblich sind. Du kannst...
 
\`💬\`... im **Chat** über alles Mögliche **diskutieren** und **quatschen**!
\`🎁\`... an regelmäßigen **Gewinnspielen & Events** teilnehmen!
\`🏆\`... viele einzigartige **Ränge, Erfolge & Vorteile** freischalten!
\`🚀\`... für **dein eigenes Projekt werben** und **VIELE User** erreichen!
\`🔨\`... jederzeit **Coding-Hilfe** für deine **Programmier-Fragen** erhalten!

> <a:warning:968872957277528144> 𑁉 **MEHR INFORMATIONEN ERHALTEN!**
\`📌\` » **Klicke auf eine Kategorie**, um dir mehr Infos anzusehen!
\`🚑\` » Öffne ein Ticket im **Ticket Support** bei **Fragen** oder **Problemen**.`)

        const deembed2 = new EmbedBuilder()
          .setTitle("<:ModeratorBadge:968871298728067082> 𑁉 **ICH HABE EINE FRAGE AN DAS SERVER-TEAM!**")
          .setDescription("<:Pfeil:995731145490706483> Solltest du eine **Frage** haben, kannst du unser Server-Team kontaktieren indem du **in dem unteren Menü** das Support-Thema auswählst, welches am besten zu deinem Anliegen passt.")
          .setColor("Green")
        interaction.reply({
          embeds: [deembed1, deembed2],
          components: [rowde],
          ephemeral: true,
        });
      }
      if (selectTargetValue === "us") {
        const usembed1 = new EmbedBuilder()
          .setTitle("<:Members:968869264838758400> 𑁉 **THIS IS COMMUNITY LOUNGE - WELCOME!**")
          .setColor("Orange")
          .setDescription(`» \`👥\` | **Community Lounge** (we) are a **general & open** community **Discord server**.

> <a:Neuigkeiten:998236221132259429> 𑁉 **WHAT CAN I DO HERE?**
» On our server, there's **plenty to do**, you will find elements that are common in video games while exploring. You can...
 
\`💬\`... **discuss** and **chat** about anything in the **chat**!
\`🎁\`... participate in regular **contests & events**!
\`🏆\`... unlock many unique **ranks, achievements & benefits**!
\`🚀\`... **promote your own project** and **reach MANY users**!
\`🔨\`... get **coding help** for your **programming questions** anytime!

> <a:warning:968872957277528144> 𑁉 **GET MORE INFORMATION!**
\`📌\` » **Click on a category** to see more information!
\`🚑\` » Open a ticket in the **Ticket Support** for **questions** or **issues**.`)

        const usembed2 = new EmbedBuilder()
          .setTitle("<:ModeratorBadge:968871298728067082> 𑁉 **I HAVE A QUESTION FOR THE SERVER TEAM!**")
          .setDescription("<:Pfeil:995731145490706483> If you have a **question**, you can contact our server team by selecting the appropriate support topic from the **menu below** that best suits your issue.")
          .setColor("Green")
        interaction.reply({
          embeds: [usembed1, usembed2],
          ephemeral: true,
        });
      }
    }
  }
}
