const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Manage bot settings')
    .setDefaultPermission(false)
    .addSubcommandGroup(subcommandGroup =>
      subcommandGroup
        .setName('weather')
        .setDescription('Weather command settings')
        .addSubcommand(subcommand =>
          subcommand
            .setName('config')
            .setDescription('Config weather command')
            .addBooleanOption(option => option.setName('enable').setDescription('Should bot send automatic weather?'))
            .addChannelOption(option => option.setName('channel').setDescription('Set channel for automatic weather'))
            .addStringOption(option => option.setName('schedule').setDescription('Set schedule for automatic weather in cron format with seconds (* * * * * *)')),
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('get')
            .setDescription('Get specific weather status')
            .addIntegerOption(option => option.setName('id').setDescription('Weather status id').setRequired(true)),
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('remove')
            .setDescription('Remove specific weather status')
            .addIntegerOption(option => option.setName('id').setDescription('Record id to remove').setRequired(true)),
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('edit')
            .setDescription('Edit specific weather status')
            .addIntegerOption(option => option.setName('id').setDescription('Record id to change').setRequired(true))
            .addStringOption(option => option.setName('new-desc').setDescription('New value status for that record').setRequired(true)),
        ),
    ),
  async execute(interaction) {
    const command = require(`./settings/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`);
    await command.execute(interaction);
  },
};