module.exports = {
  name: 'spotify',
  async execute(interaction) {
    const genre = interaction.customId.replace('spotify-', '');
    await interaction.reply(genre);
  },
};