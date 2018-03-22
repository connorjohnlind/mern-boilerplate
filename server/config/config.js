const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test' || env === 'proxy') {
  const config = require('./config.json'); // eslint-disable-line global-require
  const envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
