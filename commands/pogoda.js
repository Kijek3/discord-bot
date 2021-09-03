const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pogoda')
    .setDescription('Owca pogodynka.'),
  async execute(interaction) {
    const responses = [
      'https://www.facebook.com/Pizgastrasznie',
      'Ależ wieje',
      'Pizga strasznie',
      'Łódź zalało',
      'Piździ',
    ];
    const min = 0;
    const max = 4;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(responses[number]);
  },
};