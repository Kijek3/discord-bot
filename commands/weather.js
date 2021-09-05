const { SlashCommandBuilder } = require('@discordjs/builders');
const { sequelize, Weather } = require('../db-objects.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Owca pogodynka.')
    .addStringOption(option => option.setName('add').setDescription('Weather status effect to add')),
  async execute(interaction) {
    const desc = interaction.options.getString('add');
    if (desc) {
      console.log(`Adding '${desc}' to database...`);
      await Weather.create({ description: desc });
      await interaction.reply({ content: 'New weather status saved!', ephemeral: true });
      return;
    }

    const resp = await Weather.findOne({
      order: sequelize.random(),
    });
    if (!resp) {
      await interaction.reply('Add new weather status with **add** option');
      return;
    }
    await interaction.reply(resp.description);
  },
};