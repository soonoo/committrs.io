const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const dbCreationFailed = () => {
  process.exit(1);
};

const { DB_USERNAME: user, DB_PASSWORD: password, DB_NAME } = process.env;
const connection = mysql.createConnection({
  host: 'localhost',
  user,
  password,
});

console.log(`Creating database ${DB_NAME} ...`);
connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err) => {
  connection.end();

  if(err) {
    console.error(err)
    dbCreationFailed();
  }
});

