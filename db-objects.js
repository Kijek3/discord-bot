const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const Weather = require('./models/Weather.js')(sequelize, DataTypes);

Weather.prototype.getDesc = async function() {
  const desc = await Weather.findOne({
    order: sequelize.random(),
  });
  return desc;
};

module.exports = { Weather, sequelize };