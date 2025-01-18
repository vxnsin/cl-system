require("dotenv").config();
const { token, tokentest, databaseToken } = process.env;
const { connect, mongoose } = require("mongoose");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  Colors,
  Events,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const { spielersuche,  } = require("../config.json");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenues = new Collection();
client.modals = new Collection();
client.commandArray = [];
const spielersucheSchema = require("./schemas/spielersuche");
const deathchatping = require("./schemas/deathchat");

mongoose.set("strictQuery", false);

const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.inGuild()) return;
  if (!interaction.isCommand()) return;
  const channel = await client.channels.cache.get("1109406786118750259");
  const server = interaction.guild.name;
  const user = interaction.user.username;
  const userID = interaction.user.id;

  const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("`🌐` • Command Loger")
    .addFields({ name: "`⚙️` • Server", value: `${server}` })
    .addFields({ name: "`📝` • Command", value: `${interaction}` })
    .addFields({ name: "`🫅` • User", value: `${user} / ${userID}` })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
});

//Player Search Channel System
const bekannteSpiele = {
  fortnite: "🔫 • Fortnite",
  dn: "🔫 • Fortnite",
  rocketleague: "🚗 • Rocket League",
  rl: "🚗 • Rocket League",
  minecraft: "🌄 • Minecraft",
  mc: "🌄 • Minecraft",
  minecraftbedrock: "🌄 • Minecraft (Bedrock Edition) ",
  mcb: "🌄 • Minecraft (Bedrock Edition)",
  gta: "🚗🔫🤑 • GTA",
  valorant: "🟣 • VALORANT",
  valo: "🟣 • VALORANT",
  val: "🟣 • VALORANT",
  callofduty: "🧨 • Call of Duty",
  cod: "🧨 • Call of Duty",
  phasmo: "👻 • Phasmophobia",
  phasmophobia: "👻 • Phasmophobia",
  roblox: "💠 • Roblox",
  fifa: "⚽ • FIFA",
  lol: "🧙 • League of Legends",
  leagueoflegends: "🧙 • League of Legends",
  amongus: "👨‍🚀 • Among US",
  r6: "💣 • Rainbow 6",
  rainbowsix: "💣 • Rainbow 6",
  wr: "🏏 • War Thunder",
  warthunder: "🏏 • War Thunder",
  counterstrike: "🪦 • CS:GO",
  csgo: "🪦 • CS:GO",
  terraria: "🌳 • Terraria",
};
//Spieler Suche
client.on("messageCreate", async (message) => {
  const spielersucheData = await spielersucheSchema.findOne();
  if (!spielersucheData || !spielersucheData.enabled) {
    return;
  }
  if (message.channel.id === spielersuche && !message.author.bot) {
    let threadName = "";

    if (
      message.content.toLowerCase().startsWith("ich suche") ||
      message.content.toLowerCase().startsWith("suche")
    ) {
      //Wenn Ich suche oder Suche geschrieben wird weiter
      let spiele = [];

      for (const spiel in bekannteSpiele) {
        if (message.content.toLowerCase().includes(spiel)) {
          spiele.push(bekannteSpiele[spiel]);
        }
      }

      if (spiele.length > 0) {
        threadName = spiele.length > 1 ? "Mehrere Spiele" : spiele[0]; // Wenn mehr als 1 Spiel von der liste oben erwähnt wurde
      }

      if (threadName !== "") {
        try {
          const thread = await message.channel.threads.create({
            name: threadName,
            autoArchiveDuration: 10080, // 7 Tage (in Minuten)
          });

          await message.startThread({
            threadId: thread.id,
            autoArchiveDuration: 10080, // 7 Tage (in Minuten)
          });
        } catch (error) {
          console.error("Fehler beim Erstellen des Threads:", error);
        }
      } else {
        // Das Spiel wurde nicht erkannt
        const nichtErkanntesSpielNachricht =
          "❌ - Das Spiel wurde nicht erkannt.";
        try {
          const thread = await message.channel.threads.create({
            name: "Spiel nicht erkannt",
            autoArchiveDuration: 10080, // 7 Tage (in Minuten)
          });

          await thread.send(nichtErkanntesSpielNachricht);
        } catch (error) {
          console.error("Fehler beim Erstellen des Threads:", error);
        }
      }
    }
  }
});
client.on('messageCreate', async (message) => {
    // AutoDelete
    if (message.channel.id === 'CHANNEL_ID') {
	//60Sec
        setTimeout(() => {
            message.delete();
        }, 60000);
    }
});
client.on('debug', (message) => {
  const debugembed = new EmbedBuilder()
  .setTitle("`⚡` | Debug")
  .setColor("Blue")
  .setDescription(message)
  sendToChannel({embeds: [debugembed]});
});

client.on('warn', (message) => {
  const warnembed = new EmbedBuilder()
  .setTitle("`⚠`️ | Warnung")
  .setColor("Yellow")
  .setDescription(message)
  sendToChannel({embeds: [warnembed]});
});

client.on('error', (error) => {
	const errorMessage = error.stack || error;
  const errorembed = new EmbedBuilder()
  .setTitle("`❗` | Fehler")
  .setColor("Red")
  .setDescription(errorMessage)
  sendToChannel({content: `<@DEVELOPER_ID> | Ein Fehler ist aufgetreten`, embeds: [errorembed]});
});

function sendToChannel(message) {
  const guild = client.guilds.cache.get("GUILD_ID");
  if (!guild) return;

  const channel = guild.channels.cache.get("CHANNEL_ID");
  if (!channel) return;
  
  channel.send(message);
}
//Handler Laden
client.handleEvents();
client.handleCommands();
//Wenn der Wenn bei token kein Token angegeben ist wird der andere verwendet (For Developer)
client.login(token || tokentest);
//Database Connect
(async () => {
  await connect(databaseToken).catch(console.error);
})();
