import User from '../../db/model/User';
import Repo from '../../db/model/Repo';
import Commit from '../../db/model/Commit';
import Router from 'koa-router';
import sequelize from '../../db/index';
import * as yup from 'yup';
import { object, string, date, array } from 'yup';
import _ from 'lodash';

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
router.put('/bulk/:userId/:repoId', async (ctx) => {
  const { userId, repoId } = ctx.params;
  const commitRequestSchema = array().of(
    object().shape({
      hash: string().required(),
      date: date().required(),
      subject: string().required(),
      body: string(),
      filesChanged: string(),
    }),
  );

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
  for(const chunk of chunks) {
    const commits = await Commit.bulkCreate(chunk);
    await user.addCommits(commits);
    await repo.addCommits(commits);
  }
  ctx.body = 200;
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

