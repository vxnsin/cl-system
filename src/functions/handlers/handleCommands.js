const { token, tokentest } = process.env;
const { clientid, serverid } = require('../../../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const AsciiTable = require('ascii-table');

module.exports = (client) => {
  client.handleCommands = async () => {
    console.log(chalk.green('[Handler] > Commands | Bereit'));
    const commandFolder = fs.readdirSync('./src/commands');
    const { commands, commandArray } = client;
    const table = new AsciiTable()
      .setHeading('Slash Commands', 'Status')
      .setBorder('|', '=', '0', '0');

    for (const folder of commandFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.data.name) {
          commands.set(command.data.name, command);
          commandArray.push(command.data.toJSON());
          table.addRow(file.split('.js')[0], '✅');
        } else {
          table.addRow(file.split('.js')[0], '⛔');
        }
      }
    }

    console.log(chalk.grey(table.toString()));

    const rest = new REST({ version: '9' }).setToken(tokentest);
    try {
      console.log(chalk.yellow('Alle Commands werden neu geladen.'));
      await rest.put(
        Routes.applicationGuildCommands(clientid, serverid),
        {
          body: client.commandArray,
        }
      );
      console.log(chalk.green('Alle Commands wurden neu geladen.'));
    } catch (error) {
      console.error(error);
    }
  };
};