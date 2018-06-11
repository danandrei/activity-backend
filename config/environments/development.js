const nconf = require('nconf');

nconf.set('database', {
  server: '127.0.0.1',
  dbName: 'activity-development',
});

nconf.set('secrets', {
  jwtSecret: 'rgxVDSWP9jhMAyBWEgqjhuejlGKB2Wb9cwZEXxg8',
});
