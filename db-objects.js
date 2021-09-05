const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const Weather = require('./models/Weather.js')(sequelize, DataTypes);
const Config = require('./models/Config.js')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Weather,
  Config,
};