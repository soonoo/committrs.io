import "@babel/polyfill";
import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { koaSwaggerMiddleware, swaggerJsonMiddleware } from './service/swagger';
import sync from '../db/sync';
import serverless from 'serverless-http';

let app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(logger());
app.use(bodyParser())
app.use(koaSwaggerMiddleware);
app.use(swaggerJsonMiddleware);
app.use(cors({
  'Access-Control-Allow-Origin': '*',
}));
if(isProduction) {
  app.use(sync);
}
app.use(router.routes());

// app.use((ctx, next) => {
//   const { Authorization } = ctx.header;

//   if(!Authorization) ctx.status = 401;
//   else return next();
// });

if(isProduction) {
  app = serverless(app);
}

export { app };

