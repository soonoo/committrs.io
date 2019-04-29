import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();

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

