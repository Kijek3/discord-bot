const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const Weather = require('./models/Weather.js')(sequelize, DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
  const weather = [
    Weather.upsert({ description: 'Ależ wieje' }),
  ];
  await Promise.all(weather);
  console.log('Database synced');
  sequelize.close();
}).catch(console.error);