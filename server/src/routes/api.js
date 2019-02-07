import Router from 'koa-router';
const router = new Router();

// route for api calls
router.get('/', async (ctx) => {
  //const tokenFromCookie = ctx.cookies.get(customTokenName);
  //ctx.body = tokenFromCookie;
  ctx.body = `${ctx.method} - ${ctx.path}`;
});

export default router;

