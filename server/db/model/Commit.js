const Sequelize = require('sequelize');
const sequelize = require('../');

const Commit = sequelize.define('commit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  hash: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
  filesChanged: {
    type: Sequelize.TEXT,
  },
});

module.exports = Commit;

