// Initialize knex connection.
const Knex = require('knex');
const knexConfig = require('../config/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

const searchByName = name => knex.select('creature.spawntimesecs', 'creature_template.name')
  .from('creature')
  .leftOuterJoin('creature_template', 'creature.id', 'creature_template.entry')
  .where('creature_template.name', 'like', `%${name}%`);

module.exports = {
  searchByName,
};
