const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('covid')
    .setDescription('Covid-19 guess contest')
    .addSubcommand(subcommand =>
      subcommand
        .setName('guess')
        .setDescription('Guess how many cases will be tomorrow')
        .addIntegerOption(option => option
          .setName('cases')
          .setDescription('How many cases would it be tomorrow?')
          .setRequired(true),
        ),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all actual guesses in contest'),
    ),
  async execute(interaction) {
    const command = require(`./covid/${interaction.options.getSubcommand()}.js`);
    await command.execute(interaction);
  },
};