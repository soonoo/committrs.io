import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { env } = process;
const postfix = env.NODE_ENV === 'production' ? '_DEV' : '';

const name = env[`DB_NAME${postfix}`];
const username = env[`DB_USERNAME${postfix}`];
const password = env[`DB_PASSWORD${postfix}`];
const host = env[`DB_HOST${postfix}`];

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect: 'mysql',
  operatorsAliases: false,
});

export default sequelize;

