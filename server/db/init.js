const mysql = require('mysql2');
const info = require('./connectionInfo');

const dbCreationFailed = () => {
  process.exit(1);
};
const isProduction = process.env.NODE_ENV === 'production';
const { name, username, password, host } = info;

const connection = mysql.createConnection({
  host,
  user: username,
  password,
});

console.log(`Creating database ${name} ...`);
connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`, (err) => {
  connection.end();

  if(err) {
    console.error(err)
    dbCreationFailed();
  }
});

