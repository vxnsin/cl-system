const chalk = require("chalk");

module.exports = {
  name: "err",
  execute(err) {
    console.log(chalk.red(
      `[Database Status]: Ein Fehler ist aufgetreten:\n${err}`
    ));
  },
};
