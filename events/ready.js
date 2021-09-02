const chalk = require('chalk');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(chalk.yellowBright('Ready!'), `Logged in as ${client.user.tag}`);
    console.log('Deploy test');
  },
};