import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes';
import cors from '@koa/cors';

const app = new Koa();

app.use(logger());
app.use(cors({
  'Access-Control-Allow-Origin': '*',
}));
app.use(router.routes());

export default app;

