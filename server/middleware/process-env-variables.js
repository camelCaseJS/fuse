const buildProcessEnv = () => {
  process.env.WEB_SERVER_PORT = 8000;
  process.env.NODE_ENV = 'development';
};

module.exports = buildProcessEnv;
