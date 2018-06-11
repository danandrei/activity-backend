const nconf = require('nconf');

nconf.set('database', {
  server: '127.0.0.1',
  dbName: 'activity-development',
});

nconf.set('secrets', {
  jwtSecret: 'rgxVDSWP9jhMAyBWEgqjhuejlGKB2Wb9cwZEXxg8',
  gitlabSecret: '87cec1d30e70c36927fa2c799d0325997bf1e4afabc45c008cfd948d8a66d249',
  gitlabAppId: '2fa4483bf5e5aa439c021058870af6327f1d13d1e357783554a2bf5716d61ae0',
});
