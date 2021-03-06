/* eslint-disable global-require */
const Hapi = require('hapi');

const config = require('./config/config');

const server = new Hapi.Server();

// allow port configuration through argv
server.connection({
  port: config.port,
  routes: {
    cors: {
      credentials: true,
    },
  },
});

// Register api and plugins
server.register([
  {
    // logging
    register: require('good'),
    options: require('./config/logging'),
  }, {
    // prints routes on startup
    register: require('blipp'),
    options: {},
  },
  // needed by swagger
  require('vision'),
  require('inert'),
  {
    // api documentation
    register: require('hapi-swagger'),
    options: {},
  }], {}, (err) => {
    if (err) {
      throw err;
    }
  });

server.register({
  // api
  register: require('./api'),
  options: {},
  routes: {
    prefix: '/api/v1',
  },
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
