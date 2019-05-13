import sequelize from './';
import User from './model/User';
import Commit from './model/Commit';
import Repo from './model/Repo';

const sync = async (force = false) => {
  Repo.belongsToMany(User, { through: 'UserRepo' });
  User.belongsToMany(Repo, { through: 'UserRepo' });

  User.hasMany(Commit);
  Commit.belongsTo(User);

  Repo.hasMany(Commit, { foreignKey: 'repoId' });
  Commit.belongsTo(Repo, { foreignKey: 'repoId' });

  await sequelize.sync({ force });
};

export default sync;

