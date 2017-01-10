const Sequelize = require('sequelize');
const credentials = require('./config.js');

const dbName = {
  test: 'test',
  development: 'devFuseUsers',
  prod: 'FuseUsers',
};

const logging = (dbName[process.env.NODE_ENV] !== 'test');

const db = new Sequelize(dbName[process.env.NODE_ENV], credentials.user, credentials.password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 32773,
  logging,
  pool: {
    max: 20,
  },
});

db.authenticate()
  .then(() => console.log('connection established'))
  .catch(err => console.log('error:', err));

module.exports = db;
