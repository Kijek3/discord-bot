const fetch = require('node-fetch');
const { shuffleArray } = require('../../util');
const { MessageActionRow, MessageButton } = require('discord.js');

async function getToken() {
  let token;
  await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.SPOTIFY_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  }).then(res => res.json())
    .then(resToken => token = resToken.access_token);
  return token;
}

async function getGenres(token) {
  let genres = [];
  await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
    .then(resGenres => genres = resGenres.genres);
  return genres;
}

async function getAlbumUrl(token, genre) {
  let album;
  while (!album || !album[0]) {
    await fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genre}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(resTrack => album = resTrack?.tracks);
  }
  const albumUrl = album[0]?.album?.external_urls?.spotify;
  return albumUrl;
}

module.exports = {
  async execute(interaction) {
    const token = await getToken();
    const genres = await getGenres(token);
    let genre = interaction.options.getString('genre');

    if (genre) {
      if (genres.includes(genre)) {
        let albumUrl;
        while (!albumUrl) {
          albumUrl = await getAlbumUrl(token, genre);
        }
        await interaction.reply(albumUrl);
      } else {
        interaction.reply({ content: `I never heard about ${genre} genre`, ephemeral: true });
      }
      return;
    }

    shuffleArray(genres);
    const row = new MessageActionRow();
    for (let i = 0; i < 5; i++) {
      row.addComponents(new MessageButton().setCustomId(`${genres[i]}`).setLabel(genres[i]).setStyle('PRIMARY'));
    }
    await interaction.reply({ content: 'Choose your genre', components: [ row ] });

    const message = await interaction.fetchReply();
    const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
    collector.on('collect', async (i) => {
      if (i.user.id === interaction.user.id) {
        genre = i.customId;
        let albumUrl;
        while (!albumUrl) {
          albumUrl = await getAlbumUrl(token, genre);
        }
        await interaction.editReply({ content: albumUrl, components: [ ] });
      } else {
        await i.reply({ content: 'These buttons aren\'t for you!', ephemeral: true });
      }
    });
  },
};