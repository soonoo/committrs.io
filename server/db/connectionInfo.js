require('dotenv').config();

const { env } = process;
const postfix = env.NODE_ENV === 'production' ? '' : '_DEV';

const info = {};

module.exports = {
  name: env[`DB_NAME${postfix}`],
  username: env[`DB_USERNAME${postfix}`],
  password: env[`DB_PASSWORD${postfix}`],
  host: env[`DB_HOST${postfix}`],
};

