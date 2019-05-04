import koaSwagger from 'koa2-swagger-ui';
import { readFileSync } from 'fs';

const swaggerJsonFileName = 'swagger.json';

export const koaSwaggerMiddleware = koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: swaggerJsonFileName,
  },
});

export const swaggerJsonMiddleware = async (ctx, next) => {
  const path = `/${swaggerJsonFileName}`;

  if(ctx.url === path) {
    const json = readFileSync('.' + path);
    ctx.type = 'application/json';
    ctx.body = json;
  }

  await next();
};

