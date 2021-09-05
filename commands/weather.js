const { SlashCommandBuilder } = require('@discordjs/builders');
const { Weather, sequelize } = require('../db-objects.js');

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
      await interaction.reply({ content: 'Status pogody dodany!', ephemeral: true });
    } else {
      const resp = await Weather.findOne({
        order: sequelize.random(),
      });
      await interaction.reply(resp.description);
    }
  },
};