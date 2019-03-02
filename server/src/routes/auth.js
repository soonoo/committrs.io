import User from '../../db/model/User';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import { POST, GET } from '../util';

const router = new Router();

router.get('/github/token', async (ctx) => {
  const { code } = ctx.query;
  const { GITHUB_ID: client_id, GITHUB_SECRET: client_secret, JWT_SECRET } = process.env;
  let url = `https://github.com/login/oauth/access_token`;
  let options = {
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }
  const { access_token } = await POST({ url, options });

  url = `https://api.github.com/user?access_token=${access_token}`;
  options = {
    headers: {
      'Accept': 'application/json'
    },
  };
  const { avatar_url, login, email } = await GET({ url, options });
  let user = await User.upsert({
    name: login,
    email,
    token: access_token,
    email,
    avatarUrl: avatar_url,
  });

  ctx.body = jwt.sign({ name: login, avatarUrl: avatar_url }, JWT_SECRET);
});

export default router;

