const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '8' }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    const roles = await rest.get(
      Routes.guildRoles(process.env.GUILD_ID),
    );
    const managementRole = roles.filter(role => role.name === process.env.BOT_MANAGEMENT_ROLE)[0];
    if (managementRole) {
      const permissions = {
        permissions: [
          {
            id: managementRole.id,
            type: 1,
            permission: true,
          },
        ],
      };

      const guildCommands = await rest.get(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      );
      guildCommands.filter(command => command.default_permission === false).map(async (guildCommand) => {
        await rest.put(
          Routes.applicationCommandPermissions(process.env.CLIENT_ID, process.env.GUILD_ID, guildCommand.id),
          { body: permissions },
        );
      });
    }

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
