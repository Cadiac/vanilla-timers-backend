const Search = require('./routes/search');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/search', config: Search.nameSearch },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api',
};
