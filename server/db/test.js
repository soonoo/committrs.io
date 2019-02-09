const sequelize = require('./');
const Commit = require('./model/Commit');
//const User = require('./model/User');

Commit.create({ hash: 'sd13gsdfdfbo', })
  .then(commit => {
    console.log(commit);
    sequelize.close();
  })

