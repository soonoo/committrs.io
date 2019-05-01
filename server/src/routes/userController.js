import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import * as yup from 'yup';

const router = new Router();

router.put('/', async (ctx) => {
  const userRequestSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string(),
    avatarUrl: yup.string(),
  });

  const isValid = await userRequestSchema.isValid(ctx.request.body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const user = await User.findOne({ where: { name: ctx.request.body.name } });
  // resource already exists
  if(user !== null) {
    ctx.status = 409;
    return;
  }

  ctx.body = await User.create(ctx.request.body);
});

router.get('/:userName', async (ctx) => {
  const { userName } = ctx.params;
  const query = `
    SELECT u.id AS id, u.name AS name, u.email AS email, u.avatarUrl,
    COUNT(commits.id) AS totalCommits, COUNT(DISTINCT commits.repoId) AS totalRepos
    FROM users AS u
    INNER JOIN commits
    ON u.id = commits.userId
    WHERE u.name = :userName;
  `;
  const user = await sequelize.query(
    query,
    {
      replacements: { userName },
      type: sequelize.QueryTypes.SELECT,
    },
  );

  if(user[0].id) ctx.body = user[0];
  else ctx.status = 404;
});

export default router;

