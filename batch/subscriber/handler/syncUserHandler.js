const { homedir } = require('os');
const { pull, logSince, log, splitCommits } = require('../../utils');
const User = require('../../../server/db/model/User');
const Repo = require('../../../server/db/model/Repo');
const Commit = require('../../../server/db/model/Commit');
const sync = require('../../../server/db/sync');

const syncUserHandler = async (message) => {
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

module.exports = syncUserHandler;

