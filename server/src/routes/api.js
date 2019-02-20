import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import sync from '../../db/sync';
import Router from 'koa-router';
import sequelize from '../../db/index';

const router = new Router();
// TODO: urls have to be refined

// get commits of a user for a repo
router.get('/commits/:username/:owner/:repo', async (ctx) => {
});

// get list of repos for a user
router.get('/repos/:username', async (ctx) => {
  await sync();
  const { username } = ctx.params;
  const query = `
    SELECT repoId, COUNT(commitId) AS commitsCount FROM users JOIN
    (SELECT commits.id AS commitId, repos.id AS repoId, commits.userId AS userId
    FROM commits JOIN repos ON commits.repoId = repos.id) AS bb 
    ON users.id = bb.userId WHERE users.name = $username GROUP BY repoId;
  `;
  const options = {
    type: sequelize.QueryTypes.SELECT,
    bind: {
      username,
    },
  };

  ctx.body = await sequelize.query(query, options);
});

export default router;

