const emojischema = require("../../schemas/emoji");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (!message.author.bot) {
      const mentionedUsers = message.mentions.users;
      if (mentionedUsers.size > 0) {
        const mentionedUserId = mentionedUsers.first().id;
        const mentionedEmoji = await emojischema.findOne({
          userId: mentionedUserId,
        });
        if (mentionedEmoji) {
          message.react(mentionedEmoji.emoji);
        }
      }
    }
  },
};
