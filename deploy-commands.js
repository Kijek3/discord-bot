const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, botManagementRole } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    const roles = await rest.get(
      Routes.guildRoles(guildId),
    );
    const managementRole = roles.filter(role => role.name === botManagementRole)[0];
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
        Routes.applicationGuildCommands(clientId, guildId),
      );
      guildCommands.filter(command => command.default_permission === false).map(async (guildCommand) => {
        await rest.put(
          Routes.applicationCommandPermissions(clientId, guildId, guildCommand.id),
          { body: permissions },
        );
      });
    }

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
