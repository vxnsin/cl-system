const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        (await interaction.replay) /
          {
            content: `\`❌\` • Es ist ein **Fehler** aufgetreten!`,
            ephmeral: true,
          };
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button)
        return new Error("Es ist kein Code für diesen Button angegeben");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal)
        return new Error("Es ist kein Code für dieses Modal angegeben");

      try {
        await modal.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand) return;

      try {
        await contextCommand.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
