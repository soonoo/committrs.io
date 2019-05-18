import Sequelize from 'sequelize';
import sequelize from '../';

const SyncStatus = sequelize.define('syncStatus', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
  },
});

export default SyncStatus;

