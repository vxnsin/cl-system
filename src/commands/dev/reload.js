const { SlashCommandBuilder } = require('discord.js');
const handleCommands = require('../../functions/handlers/handleCommands');
const handleEvents = require('../../functions/handlers/handleEvents');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('👨‍🔧 • Reloade die Commands')
    .addSubcommand(subcommand =>
      subcommand
        .setName('commands')
        .setDescription('👨‍🔧 • Reloade die Commands')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('events')
        .setDescription('👨‍🔧 • Reloade die Events')
    ),

  async execute(interaction, client) {
    const { user } = interaction;

    if (user.id !== '531896089096486922')
      return interaction.reply({
        content: '`❌` • Du bist nicht der **Developer** von diesem Bot',
        ephemeral: true,
      });

    const sub = interaction.options.getSubcommand();
    switch (sub) {
      case 'commands': {
        handleCommands(client);
        await interaction.reply(`\`✅\` • Die Commands wurden neu geladen!`);
        console.log(`Commands neugeladen`);
        break;
      }
      case 'events': {
        handleEvents(client);
        await interaction.reply(`\`✅\` • Die Events wurden neu geladen!`);
        console.log(`Events neugeladen`);
        break;
      }
    }
  },
};
