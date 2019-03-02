import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes';
import cors from '@koa/cors';

const app = new Koa();

app.use(logger());
app.use(cors({
  'Access-Control-Allow-Origin': '*',
}));
// app.use((ctx, next) => {
//   const { Authorization } = ctx.header;

//   if(!Authorization) ctx.status = 401;
//   else return next();
// });
app.use(router.routes());

export default app;

