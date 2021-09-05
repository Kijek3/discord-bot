const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Opowiem Ci trochę o sobie!'),
  async execute(interaction){
    await interaction.reply(`Jestem Mordeusz! Co tam u Ciebie ${interaction.user.username}?`);
  },
};