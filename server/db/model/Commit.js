import Sequelize from 'sequelize';
import sequelize from '../';

const Commit = sequelize.define('commit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  hash: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
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

export default Commit;

