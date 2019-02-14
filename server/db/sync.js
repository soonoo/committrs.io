const sequelize = require('./');
const User = require('./model/User');
const Commit = require('./model/Commit');
const Repo = require('./model/Repo');

module.exports = async (force) => {
  Repo.belongsToMany(User, { through: 'UserRepo' });
  User.belongsToMany(Repo, { through: 'UserRepo' });

  User.hasMany(Commit);

  Repo.hasMany(Commit);

  await sequelize.sync({ force } = { force: false });
};

