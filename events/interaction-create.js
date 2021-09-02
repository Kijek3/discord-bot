const chalk = require('chalk');

module.exports = {
  name: 'interactionCreate',
  execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an ${interaction.commandName} interaction.`);
      command.execute(interaction);
    } catch (error) {
      console.error(chalk.redBright('ERROR!'), error);
      interaction.reply({ content: 'Sorki, coś się rozj*bało po mojej stronie', ephemeral: true });
    }
  },
};