import Router from 'koa-router';
import apiRouter from './api';
import authRouter from './auth';

const router = new Router();
router.use('/api', apiRouter.routes());
router.use('/auth', authRouter.routes());

export default router;

