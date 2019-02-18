import Sequelize from 'sequelize';
import sequelize from '../';

// TODO: unique key constraint should be added(owner, name)
const Repo = sequelize.define('repo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Repo;

