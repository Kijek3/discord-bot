const { Covid } = require('../../db-objects.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  async execute(interaction) {
    const records = await Covid.findAll({
      attributes: ['userId', 'guess'],
      order: [
        ['guess', 'DESC'],
      ],
    });

    let desc = '';
    records.map(record => desc += `<@${record.userId}> - ${record.guess}\n`);
    const embed = new MessageEmbed()
      .setColor('#26a32a')
      .setTitle('Covid-19 guess contest')
      .setDescription(desc);
    interaction.reply({ embeds: [embed] });
  },
};