const { SlashCommandBuilder } = require('@discordjs/builders');
const { Weather } = require('../db-objects.js');

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
      const min = 1;
      const max = await Weather.count();
      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      const resp = await Weather.findOne({
        where: { id: randomId },
      });
      await interaction.reply(resp.description);
    }
  },
};