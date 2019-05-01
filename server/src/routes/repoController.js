import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import { string, object } from 'yup';

const router = new Router();

router.put('/', async (ctx) => {
  const repoRequestSchema = object().shape({
    name: string().required(),
    owner: string().required(),
  });

  const isValid = await repoRequestSchema.isValid(ctx.request.body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  let repo = await Repo.findOne({ where: { ...ctx.request.body } });
  // resource already exists
  if(repo !== null) {
    ctx.body = { id: repo.id };
    return;
  }

  repo = await Repo.create(ctx.request.body);
  ctx.body = { id: repo.id };
});

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

