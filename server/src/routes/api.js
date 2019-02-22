import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import sync from '../../db/sync';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();

router.get('/commits/:userId/:repoId', async (ctx) => {
  await sync();
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
  await sync();
  const { userId } = ctx.params;

  ctx.body = await Commit.findAll({
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

  // const query = `
  //   SELECT repoId, COUNT(commitId) AS commitsCount FROM users JOIN
  //   (SELECT cㅏㅏㅓommits.id AS commitId, repos.id AS repoId, commits.userId AS userId
  //   FROM commits JOIN repos ON commits.repoId = repos.id) AS bb 
  //   ON users.id = bb.userId WHERE users.name = $username GROUP BY repoId;
  // `;
  // const options = {
  //   type: sequelize.QueryTypes.SELECT,
  //   bind: {
  //     username,
  //   },
  // };
});

export default router;

