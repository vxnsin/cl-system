const fs = require('fs');
const { connection } = require('mongoose');
const chalk = require('chalk');

module.exports = (client) => {
  client.handleEvents = async () => {
    console.log(chalk.green('[Handler] > Events | Bereit'));
    const eventFolder = fs.readdirSync('./src/events');

    for (const folder of eventFolder) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith('.js'));

      for (const file of eventFiles) {
        switch (folder) {
          case 'client': {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
            break;
          }
          case 'mongo': {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
            break;
          }
          case 'guild': {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
            break;
          }
          default:
            break;
        }
      }
    }
  };
};