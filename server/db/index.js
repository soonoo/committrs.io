import Sequelize from 'sequelize';
import info from './connectionInfo';
import mysql2 from 'mysql2';

const { name, username, password, host } = info;

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect: 'mysql',
  operatorsAliases: false,
  dialectModule: mysql2,
  //logging: false,
});

export default sequelize;

