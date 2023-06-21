const xpRechner = require("../../utils/xprechner");
const Level = require("../../schemas/level");

function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  name: "messageCreate",
  async execute(message) {
    const leveldata = await Level.findOne();
    if (!leveldata || !leveldata.enabled) {
      return;
    }
	
//	const xpsend = message.guild.channels.cache.get("867745021007364126");

    if (!message.author.bot) {
      const xpToGive = getRandomXp(5, 15);

      const query = {
        userId: message.author.id,
        guildId: message.guild.id,
      };

      try {
        const level = await Level.findOne(query);

        if (level) {
          level.xp += xpToGive;

          const roleLevels = {
            5: "│⚡ MASTER (LVL: 5)",
            10: "│🔮 LEGENDE (LVL: 10)",
            20: "│💎 VETERAN (LVL: 20)",
            30: "│🎯 ULTIMATE (LVL: 30)",
            40: "│⭐ PREMIUM (LVL: 40)",
            50: "│🌟 SUPREME (LVL: 50)",
            60: "│😇 CHAMPION (LVL: 60)",
            75: "│🏹 KOPFGELDJÄGER (LVL: 75)",
            100: "│🔥 BRANDSTIFTER (LVL: 100)",
          };

          while (level.xp > xpRechner(level.level)) {
            level.xp = level.xp - xpRechner(level.level);
            level.level++
            if (level.level >= 100) {
              message.channel.send(`<a:trophe:1116364779808890941> | **LEVEL-UP!** ${message.member} hat das Level **${level.level}** erreicht! - danke für deine weitere Treue für die Community! <a:discordbloblove:968872502057140264>`);
            } else if (roleLevels[level.level]) {
              const roleName = roleLevels[level.level];
              // Füge den entsprechenden Rang hinzu
              /*const role = message.guild.roles.cache.find(role => role.name === roleName);
              if (role) {
              message.member.roles.add(role);
              }
              */
              if (level.level === 100) {
                message.channel.send(`<a:trophe:1116364779808890941> | **LEVEL-UP!** ${message.member} hat das Level **${level.level}** erreicht! - und den **letzten Rang erhalten** <a:discordbloblove:968872502057140264>`);
              }
              message.channel.send(
                `<a:trophe:1116364779808890941> | **LEVEL-UP!** ${message.member} hat das Level **${level.level}** erreicht! - und einen **neugen Rang!** Erhalten! <a:discordbloblove:968872502057140264>`
              );
            } else {
              const nextRoleLevel = Object.keys(roleLevels).find(
                (roleLevel) => roleLevel > level.level
              );

              if (nextRoleLevel) {
                const levelsNeededForRole = nextRoleLevel - level.level;
                message.channel.send(
                  `<a:Bier:1116336000516489299> | **LEVEL-UP!** ${message.member} hat das Level **${level.level}** erreicht! - **${levelsNeededForRole}** bis zu einem **neuen Rang.** - Weiter so! <a:Chat:1116335351657676886>`
                );
              }
            }
          }

          await level.save().catch((e) => {
            console.log(`❌ • Error saving updated level ${e}`);
            return;
          });
        } else {
          const newLevel = new Level({
            userId: message.author.id,
            guildId: message.guild.id,
            xp: xpToGive,
          });

          await newLevel.save();
        }
      } catch (error) {
        console.log(`❌ • Error giving xp: ${error}`);
      }
    }
  },
};
