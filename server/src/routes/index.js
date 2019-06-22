import Router from 'koa-router';
import authController from './authController';
import commitController from './commitController';
import repoController from './repoController';
import userController from './userController';

const router = new Router();
router.prefix('/v1');
router.use('/auth', authController.routes());
router.use('/commits', commitController.routes());
router.use('/repos', repoController.routes());
router.use('/users', userController.routes());

export default router;

