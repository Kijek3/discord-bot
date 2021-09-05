const { Sequelize, DataTypes } = require('sequelize');
const { token, clientId, guildId, rawgToken } = require('./config.json');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

require('./models/Weather.js')(sequelize, DataTypes);
const Config = require('./models/Config.js')(sequelize, DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
  const config = [
    Config.upsert({ setting: 'token', value: token }),
    Config.upsert({ setting: 'client_id', value: clientId }),
    Config.upsert({ setting: 'guild_id', value: guildId }),
    Config.upsert({ setting: 'rawg_token', value: rawgToken }),
  ];
  await Promise.all(config);
  console.log('Database synced');
  sequelize.close();
}).catch(console.error);