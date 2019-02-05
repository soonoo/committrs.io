require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

router.get('/auth/github', async (ctx) => {
  const { code } = ctx.query;
  const customTokenName = 'committrs_token';
  const tokenFromCookie = ctx.cookies.get(customTokenName);
  const { GITHUB_ID: client_id, GITHUB_SECRET: client_secret, JWT_SECRET } = process.env;

  try {
    if(tokenFromCookie) {
      // throws an error if token is invalid
      const decoded = jwt.verify(tokenFromCookie, JWT_SECRET);
    }
    else {
      const oAuthResponse = await fetch(`https://github.com/login/oauth/access_token`, {
        method: 'post',
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const { access_token } = await oAuthResponse.json();

      const userInfoResponse = await fetch(`https://api.github.com/user?access_token=${access_token}`, {
        headers: {
          'Accept': 'application/json'
        },
      });

      if(!userInfoResponse.ok) throw new Error();

      const { avatar_url, name } = await userInfoResponse.json();
      const customToken = jwt.sign({ name }, JWT_SECRET);
      ctx.cookies.set(customTokenName, customToken);
    }
  } catch(e) {
    console.log(e)
    ctx.cookies.set(customTokenName, '');
  } finally {
    ctx.redirect('/');
  }
});

const routes = ['/', '/dashboard/:username?'];
router.get(routes, async (ctx) => {
  const customTokenName = 'committrs_token';
  const tokenFromCookie = ctx.cookies.get(customTokenName);
  ctx.body = tokenFromCookie;
});

app.use(logger());
app.use(router.routes());
app.listen(8000);

