const { EmbedBuilder} = require("discord.js");
const afkSchema = require("../../schemas/afk");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    const afkData = await afkSchema.findOne();
    if (!afkData || !afkData.enabled) {
      return;
    }
    try {
      if (!message.author.bot) {
        const afkData = await afkSchema.findOneAndDelete({
          userId: message.author.id,
        });

        if (afkData) {
          const member = message.member;
          member.setNickname(afkData.nickname);

          const currentTime = new Date();
          const afkDuration = currentTime.getTime() - afkData.startTime.getTime(); // Dauer in Millisekunden
        
          // Konvertiere die Dauer in Stunden, Minuten und Sekunden
          const seconds = Math.floor(Math.abs(afkDuration) / 1000) % 60;
          const minutes = Math.floor(Math.abs(afkDuration) / (1000 * 60)) % 60;
          const hours = Math.floor(Math.abs(afkDuration) / (1000 * 60 * 60));
        
          // Erstelle den Discord-Timestamp mit dem Zeitstempel
          const timestamp = Math.floor(afkData.startTime.getTime() / 1000); // Zeitstempel im UNIX-Zeitformat
          const discordTimestamp = `<t:${timestamp}:R>`;


          const reply = await message.channel.send(
            `<:greenAFK:1099703715994279986> | ${message.author} **ist wieder da!**\nDein AFK-Status wurde entfernt. (Dauer: ${discordTimestamp})`
          );
		 setTimeout(() => {
          reply.delete();
        }, 10000); 
        }

        const mentionedUser = message.mentions.members?.first();

        if (mentionedUser) {
          const mentionedUserData = await afkSchema.findOne({
            userId: mentionedUser.id,
          });

          if (mentionedUserData) {
            const embed = new EmbedBuilder()
              .setColor("Blue")
              .setDescription(
                `<:AFK:998236373410660382> | ${mentionedUser.user} ist momentan AFK\n> ${mentionedUserData.reason}`
              )
              .setFooter({ text: `${mentionedUser.user.id}` });


            const reply = await message.reply({ embeds: [embed] });
            setTimeout(() => {
              reply.delete();
            }, 10000); 
          }
        }
      }
    } catch (error) {
      console.error('Fehler beim Verarbeiten des "afk"-Events:', error);
    }
  },
};
