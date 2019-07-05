import Sequelize from 'sequelize';
import info from './connectionInfo';

const { name, username, password, host } = info;

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect: 'mysql',
  operatorsAliases: false,
  //logging: false,
});

export default sequelize;

