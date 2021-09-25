const CronJob = require('cron').CronJob;
const { sequelize, Weather, Settings } = require('../db-objects.js');

async function scheduleWeather(client) {
  const schedule = await Settings.findOne({
    where: { setting: 'weather_schedule' },
  });
  const job = new CronJob(schedule.value, async () => {
    const enabled = await Settings.findOne({
      where: { setting: 'weather_enable' },
    });
    if (enabled.value) {
      const resp = await Weather.findOne({
        order: sequelize.random(),
      });
      if (resp) {
        const channelId = await Settings.findOne({
          where: { setting: 'weather_channel' },
        });
        if (channelId.value) {
          const channel = client.channels.cache.get(channelId.value);
          channel.send(resp.description);
        }
      }
    }
  });

  job.start();
}

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    scheduleWeather(client);

    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
