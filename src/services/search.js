// Initialize knex connection.
const Knex = require('knex');
const knexConfig = require('../config/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

const RESULTS_PER_PAGE = 50;

const searchByName = (name, page = 0) =>
  knex.select([
    'creature.id',
    'creature.spawntimesecs',
    'creature_template.name',
    'creature_template.minlevel',
    'creature_template.maxlevel',
    'map_template.mapname',
  ])
    .from('creature')
    .leftOuterJoin('creature_template', 'creature.id', 'creature_template.entry')
    .leftOuterJoin('map_template', 'creature.map', 'map_template.entry')
    .where('creature_template.name', 'like', `%${name}%`)
    .groupBy(
      'creature.spawntimesecs',
      'creature_template.name',
      'creature.id',
      'creature_template.minlevel',
      'creature_template.maxlevel',
      'map_template.mapname'
    )
    .orderBy('creature_template.maxlevel', 'desc')
    .orderBy('creature.id') // Secondary order rule to make sure paging works
    .limit(RESULTS_PER_PAGE)
    .offset(page * RESULTS_PER_PAGE);

module.exports = {
  searchByName,
};
