const CronJob = require('cron').CronJob;
const { Weather, sequelize } = require('../db-objects.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const job = new CronJob('0 0 6,10,16 * * *', async () => {
      const resp = await Weather.findOne({
        order: sequelize.random(),
      });
      const channel = client.channels.cache.get('883819747697897513');
      channel.send(resp.description);
    });

    job.start();
  },
};
