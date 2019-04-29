import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();

router.get('/:userId/:repoId', async (ctx) => {
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

export default router;

