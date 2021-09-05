const { Weather } = require('../../../db-objects.js');

module.exports = {
  async execute(interaction) {
    const id = interaction.options.getInteger('id');
    const newDesc = interaction.options.getString('new-desc');
    const resp = await Weather.findOne({
      where: { id: id },
    });
    if (!resp) {
      await interaction.reply({ content: `Wrong id (${id})`, ephemeral: true });
      return;
    }

    await resp.update({ description: newDesc });
    await interaction.reply({ content: `Record with id ${id} updated`, ephemeral: true });
  },
};