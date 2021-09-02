module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an ${interaction.commandName} interaction.`);
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Sorki, coś się posypało po mojej stronie :(', ephemeral: true });
    }
  },
};