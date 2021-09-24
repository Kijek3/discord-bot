const { Sequelize, DataTypes } = require('sequelize');
const { Settings } = require('./db-objects.js');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

require('./models/Weather.js')(sequelize, DataTypes);
require('./models/Settings.js')(sequelize, DataTypes);
require('./models/Covid.js')(sequelize, DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
  const settings = [
    Settings.findCreateFind({
      where: { setting: 'weather_enable' },
      defaults: { setting: 'weather_enable', value: false },
    }),
    Settings.findCreateFind({
      where: { setting: 'weather_channel' },
      defaults: { setting: 'weather_channel', value: '' },
    }),
    Settings.findCreateFind({
      where: { setting: 'weather_schedule' },
      defaults: { setting: 'weather_schedule', value: '0 0 6,10,16 * * *' },
    }),
  ];
  await Promise.all(settings);
  console.log('Database synced');
  sequelize.close();
}).catch(console.error);