const Joi = require('joi');
const Boom = require('boom');

const searchService = require('../../services/search');

module.exports.nameSearch = {
  description: 'Search NPC by name',
  validate: {
    query: {
      name: Joi.string().required(),
      page: Joi.number().integer().min(0),
    },
  },
  tags: ['api'],
  handler: (request, reply) =>
    searchService.searchByName(request.query.name, request.query.page)
      .then((result) => {
        if (result) {
          return reply(result);
        }
        return reply(Boom.notFound());
      })
      .catch(err => reply(Boom.badImplementation('Search failed', err)))
};
