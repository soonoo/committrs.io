import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import { paginationSchema, commitRequestSchema } from '../schema';
import _ from 'lodash';
import roles from '../middlewares/roles';

const router = new Router();

/**
 * @swagger
 * /commits/bulk/{userId}/{repoId}:
 *   put:
 *     summary: Add bulk commits for a user in repo
 *     tags:
 *       - commit
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: integer
 *       - name: repoId
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: integer
 *       - name: body
 *         description: Commit object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               hash:
 *                 type: string
 *               date:
 *                 type: string
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               filesChanged:
 *                 type: string
 *         
 */
router.put('/bulk/:userId/:repoId', roles('admin'));
router.put('/bulk/:userId/:repoId', async (ctx) => {
  const { userId, repoId } = ctx.params;

  const isValid = await commitRequestSchema.isValid(ctx.request.body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const user = await User.findOne({ where: { id: userId } });
  const repo = await Repo.findOne({ where: { id: repoId } })
  if(user === null || repo === null) {
    ctx.status = 400;
    return;
  }

  const chunks = _.chunk(ctx.request.body, 500);
  ctx.status = 200;

  for(const chunk of chunks) {
    try{ 
      const commits = await Commit.bulkCreate(chunk);
      await user.addCommits(commits);
      await repo.addCommits(commits);
    } catch(e) {
      ctx.status = 202;
    }
  }
});

/**
 * @swagger
 * /commits/{userId}/{repoId}:
 *   get:
 *     summary: Get user's commit list in a repo
 *     tags:
 *       - commit
 *     responses:
 *       default:
 *         - description:
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: integer
 *       - name: repoId
 *         in: path
 *         required: true
 *         type: integer
 *         schema:
 *           type: integer
 */
router.get('/:userId/:repoId', async (ctx) => {
  const { userId, repoId } = ctx.params;
  const { Op } = sequelize;

  let pagination;
  try {
    pagination = paginationSchema.cast(ctx.query);
  } catch(e) {
    pagination = paginationSchema.default();
  }

  const data = await Commit.findAll({
    where: { repoId, userId },
    limit: 20,
  });
  // console.log(data)
  // const data = await Repo.findOne({
  //   where: { id: repoId },
  //   include:[{
  //     model: Commit,
  //     attributes: {
  //       exclude: [ 'createdAt', 'updatedAt', 'userId', 'repoId', ],

  //       // `foreignKey` property in association definition should be specified
  //       // to use `limit`, `offset` option.
  //       // https://github.com/sequelize/sequelize/issues/7514
  //       include: ['repoId'],
  //     },
  //     where: { userId },
  //     ...pagination,
  //   }],
  // });

  if(data === null) {
    ctx.status = 404;
  } else {
    ctx.body = data;
  }
});

export default router;

