const buildProcessEnv = () => {
  process.env.WEB_SERVER_PORT = 8000;
  process.env.NODE_ENV = 'development';
  process.env.DB_DIALECT = 'postgres';
  // ENV setting for a docker container DB
  process.env.DB_HOST = 'database';
  // ENV setting for a localhost DB
  // process.env.DB_HOST = 'localhost';
  // process.env.DB_PORT = 5433;
};

module.exports = buildProcessEnv;
