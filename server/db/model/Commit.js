const Sequelize = require('sequelize');
const sequelize = require('../');

const Commit = sequelize.define('Commit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
  },
});

module.exports = Commit;

