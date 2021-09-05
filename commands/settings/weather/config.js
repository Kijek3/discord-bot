const { Settings } = require('../../../db-objects.js');

module.exports = {
  async execute(interaction) {
    const shouldEnable = interaction.options.getBoolean('enable');
    const channel = interaction.options.getChannel('channel');
    const schedule = interaction.options.getString('schedule');

    if (shouldEnable) {
      await Settings.upsert({
        setting: 'weather_enable',
        value: shouldEnable,
      });
    }

    if (channel) {
      await Settings.upsert({
        setting: 'weather_channel',
        value: channel.id,
      });
    }

    if (schedule) {
      await Settings.upsert({
        setting: 'weather_schedule',
        value: schedule,
      });
    }

    await interaction.reply({ content: 'Weather config updated', ephemeral: true });
  },
};