const fetch = require('node-fetch');
const { rawgToken } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
  async execute(interaction) {
    const min = 1;
    const max = 598247;
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const url = `https://api.rawg.io/api/games?key=${rawgToken}&page_size=1&page=${randomId}`;
    await interaction.deferReply();
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        fetch(`https://api.rawg.io/api/games/${data.results[0].id}?key=${rawgToken}`)
          .then(res2 => res2.json())
          .then(game => {
            const embed = new MessageEmbed()
              .setColor(`#${randomColor}`)
              .setTitle(game.name)
              .setURL(`https://rawg.io/games/${game.slug}`)
              .setDescription(game.description.replace(/<br\/?[^>]+(>|$)/g, '\n').replace(/<\/?[^>]+(>|$)/g, ''))
              .setImage(game.background_image);
            interaction.editReply({ embeds: [embed] });
          });
      });
  },
};