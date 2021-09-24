const { Covid } = require('../../db-objects.js');

module.exports = {
  async execute(interaction) {
    const cases = interaction.options.getInteger('cases');
    if (cases < 0) {
      interaction.reply({ content: 'Hopefully your coronavirus test isn\'t positive, but your number should be', ephemeral: true });
      return;
    }

    await Covid.upsert({
      userId: interaction.user.id,
      guess: cases,
    });
    interaction.reply(`Your guess (${cases}) has been recorded :microbe:`);
  },
};