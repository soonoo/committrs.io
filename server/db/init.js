const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const { DB_USERNAME: user, DB_PASSWORD: password, DB_NAME } = process.env;
const connection = mysql.createConnection({
  host: 'localhost',
  user,
  password,
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`, (err) => {
  if(!err) connection.end();
});

