const Sequelize = require('sequelize');

//const { DB_USERNAME: username, DB_PASSWORD: password } = process.env;

const sequelize = new Sequelize('committrs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize.sync();

module.exports = sequelize;

