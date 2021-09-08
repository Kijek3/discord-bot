const { randomNumber } = require('../../util');

module.exports = {
  async execute(interaction) {
    const min = interaction.options.getInteger('min');
    const max = interaction.options.getInteger('max');
    if (min > max) {
      await interaction.reply({ content: `Please, ${max} is not greater than ${min}. Learn math bro.`, ephemeral: true });
      return;
    }

    const rolling = 'Rolling virtual dice...';
    let whitespaces = '';
    const dice = ':game_die:';

    await interaction.reply(`${rolling}${whitespaces}${dice}`);
    for (let i = 0; i < 10; i++) {
      whitespaces += ' ';
      await interaction.editReply(`${rolling}${whitespaces}${dice}`);
    }

    const number = randomNumber(min, max);
    await interaction.editReply(`From ${min} to ${max}, your number is: ${number.toString(10)}`);
  },
};