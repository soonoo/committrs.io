import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import SyncStatus from '../../db/model/SyncStatus';
import Router from 'koa-router';
import sequelize from '../../db/index';
import { userPutRequestSchema, userPostRequestSchema, userSyncStatusSchema } from '../schema';
import { createUser, updateUser } from '../service/userService';
import mc, { body } from '../service/mail';
import roles from '../middlewares/roles';
import jwt from 'jsonwebtoken';

const router = new Router();

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Add a new user
 *     tags:
 *       - user
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: body
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           type: object
 *           properties:
 *             github_login:
 *               type: string
 *             email:
 *               type: string
 *             avatarUrl:
 *               type: string
 */
router.put('/', roles('admin'));
router.put('/', async (ctx) => {
  const { body } = ctx.request;

  const isValid = await userPutRequestSchema.isValid(body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  // check if user exists
  const user = await User.findOne({ where: { github_login: body.github_login } });
  if(user !== null) {
    ctx.status = 409;
    return;
  }

  ctx.body = await createUser(body);
});

router.get('/authStatus', async (ctx) => {
  ctx.body = {
    ...ctx.token,
  };
});

// update user
router.post('/:id', roles(['admin', 'user']));
router.post('/:id', async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const { token } = ctx;
  const { JWT_SECRET } = process.env;

  const isValid = await userPostRequestSchema.isValid(body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  if(!token.roles.includes('admin') && token.id !== Number(id)) {
    ctx.status = 403;
    return;
  }

  const affected  = await updateUser({ id, ...body });
  if(affected[0] === 0) {
    ctx.status = 404;
  } else {
    const user = await User.findByPk(id);
    const token = jwt.sign({
      ...user.get(),
      token: null,
      email: null,
      roles: ctx.token.roles,
    }, JWT_SECRET);

    ctx.cookies.set('cmtrs-token', token);
    ctx.status = 200;
  }
});

// update user sync status
router.post('/:id/syncStatus', roles('admin'));
router.post('/:id/syncStatus', async (ctx) => {
  const { id: userId } = ctx.params;
  const { name } = ctx.request.body;
  const isValid = await userSyncStatusSchema.isValid({ name });
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const status = await SyncStatus.findOne({ where: { name }});
  if(!status) {
    ctx.status = 400;
    return;
  }

  const user = await User.findByPk(userId);
  if(!user) {
    ctx.status = 404;
    return;
  }
  user.syncStatusId = status.get().id;
  user.save();
  ctx.status = 200;

  if(name === 'UPDATED') {
    const { github_login, email } = user.get();
    try {
      await mc.update(github_login, email)
    } catch(e) {
      ctx.status  = 500;
    }
  }
});

/**
 * @swagger
 * /users/{userName}:
 *   get:
 *     summary: Get a user
 *     tags:
 *       - user
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *           type: string
 */
router.get('/:userName', async (ctx) => {
  const { userName } = ctx.params
  const query = `
    SELECT u.id AS id, u.github_login AS github_login, u.github_name AS github_name, u.email AS email, u.avatarUrl, ss.name AS syncStatus, ss.description AS syncDesc,
    COUNT(commits.id) AS totalCommits, COUNT(DISTINCT commits.repoId) AS totalRepos
    FROM users AS u
    JOIN commits
    ON u.id = commits.userId
    LEFT JOIN syncStatuses AS ss
    ON u.syncStatusId = ss.id
    WHERE u.github_login = :userName;
  `;
  const user = await sequelize.query(
    query,
    {
      replacements: { userName },
      type: sequelize.QueryTypes.SELECT,
    },
  );

  if(user[0].id) {
    ctx.body = user[0];
  } else {
    ctx.status = 404;
  }
});

router.get('/:userName/repos', async (ctx) => {
  const { userName } = ctx.params;
  const result = await Commit.findAll({
    raw: true,
    attributes: [[sequelize.fn('COUNT', sequelize.col('commit.id')), 'totalCommits']],
    include: [{
      model: Repo,
      attributes: ['id', 'name', 'owner', 'starsCount', 'description', 'languages'],
    }, {
      model: User,
      where: {
        github_login: userName,
      },
    }],
    group: ['repoId'],
  });

  ctx.body = result.map((commit) => {
    return {
      id: commit['repo.id'],
      name: commit['repo.name'],
      owner: commit['repo.owner'],
      starsCount: commit['repo.starsCount'],
      description: commit['repo.description'],
      totalCommits: commit['totalCommits'],
      languages: commit['repo.languages'],
    };
  });
});

export default router;

