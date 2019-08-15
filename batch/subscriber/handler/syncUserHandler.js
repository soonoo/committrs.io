import { homedir } from 'os';
import { pull, logSince, log, splitCommits } from '../../utils';
import User from '../../../server/db/model/User';
import Repo from '../../../server/db/model/Repo';
import Commit from '../../../server/db/model/Commit';
import sync from '../../../server/db/sync';

const syncUserHandler = async ({ message, token }) => {
  await sync();
  const repos = await Repo.findAll({
    limit: 50,
    order: [['updatedAt', 'DESC']],
  });

  for(repo of repos) {
    const { owner, name } = repo.dataValues;

    process.cwd(`${homedir()}/${owner}/${name}`);
    await pull();

    const users = (await Repo.findAll({
      where: {
        id: repo.dataValues.id,
      },
      include: [{
        model: User,
        through: {
          where: {
            repoId: repo.dataValues.id,
          },
        },
      }],
    }))[0].users;

    for(user of users) {
      const gitLog = await log(user.dataValues.name);
      const rawCommits = splitCommits(gitLog);
      const commits = await Commit.bulkCreate(commits);
      user.addCommits(commits);
      repo.addCommits(commits);
    }
  }
};

export default syncUserHandler;

