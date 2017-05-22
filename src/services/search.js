// Initialize knex connection.
const Knex = require('knex');
const knexConfig = require('../config/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

const searchByName = name => knex.select().from('creature_template').where('name', name);

module.exports = {
  searchByName,
};
