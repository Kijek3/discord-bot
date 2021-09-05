const CronJob = require('cron').CronJob;
const { Weather } = require('../db-objects.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const job = new CronJob('0 0 8,12,18 * * *', async () => {
      const min = 1;
      const max = await Weather.count();
      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      const resp = await Weather.findOne({
        where: { id: randomId },
      });
      const channel = client.channels.cache.get('883819747697897513');
      channel.send(resp.description);
    });

    job.start();
  },
};