// Update with your config settings.
const config = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: config.databaseUrl,
  },

  test: {
    client: 'mysql',
    connection: config.databaseUrl,
  },

  production: {
    client: 'mysql',
    connection: config.databaseUrl,
  },

};
