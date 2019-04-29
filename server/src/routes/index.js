import Router from 'koa-router';
import authController from './authController';
import commitController from './commitController';
import repoController from './repoController';
import userController from './userController';

const router = new Router();
router.use('/auth', authController.routes());
router.use('/api/commits', commitController.routes());
router.use('/api/repos', repoController.routes());
router.use('/api/user', userController.routes());

export default router;

