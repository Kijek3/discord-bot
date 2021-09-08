const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Feel the madness of randomness')
    .addSubcommand(subcommand =>
      subcommand
        .setName('spotify')
        .setDescription('Find your next artist')
        .addStringOption(option => option
          .setName('genre')
          .setDescription('What genre are you interested in?'),
        ),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('game')
        .setDescription('Find your next game'),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('number')
        .setDescription('Let\'s roll some dices')
        .addIntegerOption(option => option.setName('min').setDescription('Min value').setRequired(true))
        .addIntegerOption(option => option.setName('max').setDescription('Max value').setRequired(true)),
    ),
  async execute(interaction) {
    const command = require(`./random/${interaction.options.getSubcommand()}.js`);
    await command.execute(interaction);
  },
};