const CronJob = require('cron').CronJob;
const { sequelize, Weather, Settings, Covid } = require('../db-objects.js');
const { Op } = require('sequelize');

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

async function scheduleCovid(client) {
  const job = new CronJob('0 50 10 * * *', async () => {
    const cases = 200;
    const firstWinner = await Covid.findOne({
      attributes: ['guess'],
      order: [
        [sequelize.fn('ABS', sequelize.literal(`guess - ${cases}`)), 'ASC'],
      ],
    });

    if (firstWinner) {
      const channel = client.channels.cache.get('509863534222508054');
      const difference = Math.abs(firstWinner.guess - cases);

      const allWinners = await Covid.findAll({
        attributes: ['userId', 'guess'],
        where: {
          guess: {
            [Op.or]: [cases - difference, cases + difference],
          },
        },
      });

      if (allWinners.length == 1) {
        channel.send(`Congratulations <@${allWinners[0].userId}>, your guess ${allWinners[0].guess} was closest to ${cases}`);
      } else {
        channel.send(`Incredibly, we have more than one winner! Congratulations ${allWinners.map(winner => `<@${winner.userId}> (${winner.guess})`).join(', ')}`);
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
    scheduleCovid(client);

    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
