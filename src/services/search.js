// Initialize knex connection.
const Knex = require('knex');
const knexConfig = require('../config/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

const RESULTS_PER_PAGE = 50;

const searchByName = (name, page = 0) => knex.select('creature.spawntimesecs', 'creature_template.name')
  .from('creature')
  .leftOuterJoin('creature_template', 'creature.id', 'creature_template.entry')
  .where('creature_template.name', 'like', `%${name}%`)
  .limit(RESULTS_PER_PAGE)
  .offset(page * RESULTS_PER_PAGE);

module.exports = {
  searchByName,
};
