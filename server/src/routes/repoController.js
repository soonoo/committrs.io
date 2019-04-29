import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();

router.get('/:userId', async (ctx) => {
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


export default router;

