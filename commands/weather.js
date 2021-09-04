const { SlashCommandBuilder } = require('@discordjs/builders');

const responses = [
  'https://www.facebook.com/Pizgastrasznie',
  'Ależ wieje',
  'Pizga strasznie',
  'Łódź zalało',
  'Piździ',
  'Gdy Pomorze nie pomoże, to pomoże może morze, a gdy morze nie pomoże, to pomoże może las. Jak Pomorze nie pomoże, to pomoże może morze, a jak morze nie pomoże, to pomoże może Gdańsk. Pojedziemy na Pomorze, jak Pomorze nie pomoże, to pomoże może morze, a jak morze nie pomoże, to pomoże może Hel.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Owca pogodynka.'),
  async execute(interaction) {
    const min = 0;
    const max = responses.length - 1;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(responses[number]);
  },
};