import Sequelize from 'sequelize';
import sequelize from '../';

const User = sequelize.define('user', {
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
  email: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
  avatarUrl: {
    type: Sequelize.STRING,
  },
});

export default User;

