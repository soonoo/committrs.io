import "@babel/polyfill";
import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { koaSwaggerMiddleware, swaggerJsonMiddleware } from './service/swagger';
import sync from '../db/sync';
import serverless from 'serverless-http';
import userInfoMiddleware from './middlewares/userInfo';
import customCorsMiddleware from './middlewares/customCors';

let app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(logger());
app.use(bodyParser())
app.use(koaSwaggerMiddleware);
app.use(swaggerJsonMiddleware);
app.use(cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST'],
  credentials: true,
}));
app.use(sync);
app.use(userInfoMiddleware());
app.use(customCorsMiddleware())
app.use(router.routes());

// if(isProduction) {
//   app = serverless(app);
// }

export { app };

