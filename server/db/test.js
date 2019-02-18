import sync from './sync';
import sequelize from './';
import User from './model/User';
import Repo from './model/Repo';
import Commit from './model/Commit';
import random from 'randomstring';

(async function() {
  await sync(true);

  const users = (new Array(100)).fill('user').map((user, index) => `user${index}`);

  for(const user of users) {
    const tempUser = await User.create({ name: user });
    const repos = [];

    const date = (new Date()).getTime();
    for(let i = 0; i < 5; i++) {
      const tempRepo = await Repo.create({ owner: user, name: (date + i).toString() });
      await tempUser.addRepo(tempRepo);
      for(let j = 0; j < 10; j ++) {
        await Commit.create({ hash: (date + 1e8 + j).toString(), userId: tempUser.id, repoId: tempRepo.id, subject: '' });
      }
    }
  }

  sequelize.close();
})();

