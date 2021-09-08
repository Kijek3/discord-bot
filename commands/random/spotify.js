const fetch = require('node-fetch');
const { spotifyToken } = require('../../config.json');
const { shuffleArray } = require('../../util');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  async execute(interaction) {
    const token = await this.getToken();
    const genres = await this.getGenres(token);
    const genre = interaction.options.getString('genre');
    if (genre) {
      if (genres.includes(genre)) {
        let albumUrl;
        while (!albumUrl) {
          albumUrl = await this.getAlbum(token, genre);
        }
        await interaction.reply(albumUrl);
      } else {
        interaction.reply({ content: `I never heard about ${genre} genre`, ephemeral: true });
      }
      return;
    }
    shuffleArray(genres);
    const row = new MessageActionRow()
      .addComponents(new MessageButton().setCustomId(`spotify-${genres[0]}`).setLabel(genres[0]).setStyle('PRIMARY'))
      .addComponents(new MessageButton().setCustomId(`spotify-${genres[1]}`).setLabel(genres[1]).setStyle('PRIMARY'))
      .addComponents(new MessageButton().setCustomId(`spotify-${genres[2]}`).setLabel(genres[2]).setStyle('PRIMARY'))
      .addComponents(new MessageButton().setCustomId(`spotify-${genres[3]}`).setLabel(genres[3]).setStyle('PRIMARY'))
      .addComponents(new MessageButton().setCustomId(`spotify-${genres[4]}`).setLabel(genres[4]).setStyle('PRIMARY'));
    interaction.reply({ content: 'Choose your genre', components: [ row ], ephemeral: true });
  },
  async getToken() {
    let token;
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${spotifyToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    }).then(res => res.json())
      .then(resToken => token = resToken.access_token);
    return token;
  },
  async getGenres(token) {
    let genres = [];
    await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json())
      .then(resGenres => genres = resGenres.genres);
    return genres;
  },
  async getAlbum(token, genre) {
    let albumUrl;
    await fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genre}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(resTrack => albumUrl = resTrack?.tracks[0]?.album?.external_urls?.spotify);
    return albumUrl;
  },
};