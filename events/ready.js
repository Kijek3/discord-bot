module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity('ofiary', { type: 'WATCHING' });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};