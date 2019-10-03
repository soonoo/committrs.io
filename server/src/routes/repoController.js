import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import { commitRequestSchema } from '../schema';
import { repoRequestSchema } from '../schema';
import roles from '../middlewares/roles';

const router = new Router();
 
/**
 * @swagger
 * /repos:
 *   put:
 *     summary: Add a new repository
 *     tags:
 *       - repo
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: body
 *         description: Repository object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             owner:
 *               type: string
 */
router.put('/', roles('admin'));
router.put('/', async (ctx) => {
  const isValid = await repoRequestSchema.isValid(ctx.request.body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const { owner, name } = ctx.request.body;
  const repo = await Repo.findOne({
    where: {
      owner,
      name,
    },
  });

  console.log(repo)
  // resource already exists
  if(repo !== null) {
    ctx.body = repo;
    ctx.status = 409;
    return;
  }

  ctx.body = await Repo.create(ctx.request.body);
});

/**
 * @swagger
 * /repos/{repoId}/{userId}:
 *   put:
 *     summary: Make association between repoId and userid
 *     tags:
 *       - repo
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: repoId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *         schema:
 *           type: integer
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *         schema:
 *           type: integer
 */
router.put('/:repoid/:userId', roles('admin'));
router.put('/:repoId/:userId', async (ctx) => {
  const { repoId, userId } = ctx.params;
  const repo = await Repo.findOne({ where: { id: repoId } });
  const user = await User.findOne({ where: { id: userId } });

  if(repo === null || user === null) {
    ctx.status = 400;
    return;
  }

  repo.addUser(user);
  ctx.status = 200;
});

/**
 * @swagger
 * /repos/{userId}:
 *   get:
 *     summary: Get a list of user's repository
 *     tags:
 *       - repo
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         format: int64
 *         schema:
 *           type: integer
 */
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
      attributes: ['id', 'name', 'owner', 'starsCount', 'description'],
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
    };
  });
});

export default router;

