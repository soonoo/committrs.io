import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import { sqsNewUser } from '../service/sqs';
import { userRequestSchema } from '../schema';

const router = new Router();

/**
 * @swagger
 * /user:
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
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             avatarUrl:
 *               type: string
 */
router.put('/', async (ctx) => {
  const { body } = ctx.request;

  const isValid = await userRequestSchema.isValid(body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const user = await User.findOne({ where: { name: body.name } });
  // resource already exists
  if(user !== null) {
    ctx.status = 409;
    return;
  }

  sqsNewUser(body.name);

  ctx.body = await User.create(ctx.request.body);
});

/**
 * @swagger
 * /user/{userName}:
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

