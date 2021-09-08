module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const button = interaction.client.buttons.get(interaction.customId.split('-')[0]);

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Sorki, coś się posypało po mojej stronie :(', ephemeral: true });
    }
  },
};