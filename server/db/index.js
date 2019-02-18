import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize('committrs', DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

export default sequelize;

