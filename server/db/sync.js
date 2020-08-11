import sequelize from './';
import User from './model/User';
import Commit from './model/Commit';
import Repo from './model/Repo';
import SyncStatus from './model/SyncStatus';

const isProduction = process.env.NODE_ENV === 'production';

const sync = async (ctx, next, force = false) => {
  Repo.belongsToMany(User, { through: 'UserRepo' });
  User.belongsToMany(Repo, { through: 'UserRepo' });

  User.hasMany(Commit);
  Commit.belongsTo(User);

  Repo.hasMany(Commit, { foreignKey: 'repoId' });
  Commit.belongsTo(Repo, { foreignKey: 'repoId' });

  SyncStatus.hasMany(User);
  User.belongsTo(SyncStatus);

  await sequelize.sync({ force: false });
  // await SyncStatus.findOrCreate({ where: { name: 'ADDED', description: 'User is created and information will be synchronized soon.' }});
  // await SyncStatus.findOrCreate({ where: { name: 'SYNCING', description: 'User is waiting for update. Contributions will be synchonized soon.' }});
  // await SyncStatus.findOrCreate({ where: { name: 'DEFAULT' }});

  await next();
};

export default sync;


