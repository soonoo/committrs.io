const sync = require('./sync');
const sequelize = require('./');
const User = require('./model/User');
const Repo = require('./model/Repo');
const Commit = require('./model/Commit');
const random = require('randomstring');

(async function() {
  await sync(true);

  const users = (new Array(100)).fill('user').map((user, index) => `user${index}`);

  for(user of users) {
    const tempUser = await User.create({ name: user });
    const repos = [];

    const date = (new Date()).getTime();
    for(let i = 0; i < 5; i++) {
      const tempRepo = await Repo.create({ owner: user, name: (date + i).toString() });
      await tempUser.addRepo(tempRepo);
      for(let j = 0; j < 10; j ++) {
        await Commit.create({ hash: (date + 1e8 + j).toString(), userId: tempUser.id, repoId: tempRepo.id });
      }
    }
  }

  sequelize.close();
})();

