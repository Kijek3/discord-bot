const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-number')
    .setDescription('Dostaniesz ode mnie losową liczbę!'),
  async execute(interaction) {
    const min = 1;
    const max = 100;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    await interaction.reply(number.toString(10));
  },
};