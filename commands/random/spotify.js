const fetch = require('node-fetch');
const { spotifyToken } = require('../../config.json');

module.exports = {
  async execute(interaction) {
    // const token = await this.getToken();
    // const genres = await this.getGenres(token);
    // console.log(genres);
    interaction.reply('Dzień dobry');
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
};