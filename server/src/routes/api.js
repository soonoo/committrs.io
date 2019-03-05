import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();

router.get('/commits/:userId/:repoId', async (ctx) => {
  const { userId, repoId } = ctx.params;
  const { Op } = sequelize;

  ctx.body = await Repo.findOne({
    include:[{
      model: Commit,
      attributes: {
        exclude: [ 'createdAt', 'updatedAt', 'userId', 'repoId', ],
      },
      where: {
        [Op.and]: [
          { repoId },
          { userId },
        ],
      },
    }],
  });
});

router.get('/repos/:userId', async (ctx) => {
  const { userId } = ctx.params;
  const result = await Commit.findAll({
    raw: true,
    where: {
      userId,
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('commit.id')), 'totalCommits']],
    include: [{
      model: Repo,
      attributes: ['id', 'name', 'owner'],
    }],
    group: ['repoId'],
  });

  ctx.body = result.map((commit) => {
    return {
      id: commit['repo.id'],
      name: commit['repo.name'],
      owner: commit['repo.owner'],
      totalCommits: commit['totalCommits'],
    };
  });
});

router.get('/user/:userName', async (ctx) => {
  const { userName } = ctx.params;
  const user = await User.findOne({
    where: {
      name: userName,
    },
    attributes: {
      exclude: ['token'],
    },
  });

  if(user) ctx.body = user;
  else ctx.status = 404;
});

export default router;

