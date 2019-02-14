const sync = require('./sync');

(async function() {
  await sync(true);

  const user = await User.create({ name: 'soonoo' });
  const commit = await Commit.create({ hash: 'sd13gsdfdfbo', userId: 1 });
  const repo = await Repo.create({ name: 'blog', owner: 'soonoo' });

  await user.addRepo(repo)

  sequelize.close();
})();

