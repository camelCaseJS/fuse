const Sequelize = require('sequelize');
const credentials = require('./config.js');

const dbName = {
  test: 'test',
  development: 'devFuseUsers',
  prod: 'FuseUsers',
};

const logging = (dbName[process.env.NODE_ENV] !== 'test');

const db = new Sequelize(dbName[process.env.NODE_ENV], credentials.user, credentials.password, {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  // port: process.env.DB_PORT || 5433,
  logging: false,
  pool: {
    max: 20,
  },
});

db.authenticate()
  .then(() => console.log('connection established'))
  .catch(err => console.log('error:', err));

module.exports = db;
