const { SlashCommandBuilder } = require('@discordjs/builders');
const { rawgToken } = require('../config.json');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-game')
    .setDescription('Dostaniesz ode mnie losową grę!'),
  async execute(interaction) {
    const min = 1;
    const max = 598247;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const url = `https://api.rawg.io/api/games?key=${rawgToken}&page_size=1&page=${number}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        fetch(`https://api.rawg.io/api/games/${data.results[0].id}?key=${rawgToken}`)
          .then(res2 => res2.json())
          .then(game => {
            const embed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle(game.name)
              .setURL(`https://rawg.io/games/${game.slug}`)
              .setDescription(game.description.replace(/<br\/?[^>]+(>|$)/g, '\n').replace(/<\/?[^>]+(>|$)/g, ''))
              .setImage(game.background_image);
            interaction.reply({ embeds: [embed] });
          });
      });
  },
};