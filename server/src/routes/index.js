import Router from 'koa-router';
import authController from './authController';
import commitController from './commitController';
import repoController from './repoController';
import userController from './userController';

const router = new Router();
router.use('/auth', authController.routes());
router.use('/commits', commitController.routes());
router.use('/repos', repoController.routes());
router.use('/users', userController.routes());

const v1 = new Router();
v1.use('/v1', router.routes());

export default v1;

