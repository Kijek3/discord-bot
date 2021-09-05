const { Weather } = require('../../../db-objects.js');

module.exports = {
  async execute(interaction) {
    const id = interaction.options.getInteger('id');
    const resp = await Weather.destroy({
      where: { id: id },
    });
    if (!resp) {
      await interaction.reply({ content: `Wrong id (${id})`, ephemeral: true });
      return;
    }
    await interaction.reply({ content: `Removed id ${id}`, ephemeral: true });
  },
};