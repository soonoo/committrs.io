import User from '../../db/model/User';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const router = new Router();

router.get('/github/token', async (ctx) => {
  const githubLoginUrl = 'https://github.com/login/oauth/access_token';
  const githubTokenUrl = 'https://api.github.com/user';
  const postfix = isProduction ? '' : '_DEV';
  const client_id = process.env[`GITHUB_ID${postfix}`];
  const client_secret = process.env[`GITHUB_SECRET${postfix}`];
  const client_host = process.env[`CLIENT_HOST${postfix}`];
  const { JWT_SECRET } = process.env;
  const { code } = ctx.query;
  let options = {
    headers: {
      'Accept': 'application/json',
    },
  };
  const body = {
    client_id,
    client_secret,
    code,
  };

  const { data: { access_token } } = await axios.post(githubLoginUrl, body, options);
  const { data: { avatar_url, login, email } } = await axios.get(`${githubTokenUrl}?access_token=${access_token}`);
  let user = await User.upsert({
    name: login,
    token: access_token,
    email,
    avatarUrl: avatar_url,
  });

  const token = jwt.sign({ name: login, avatarUrl: avatar_url }, JWT_SECRET);
  ctx.cookies.set('cmtrs-token', token);
  ctx.redirect(`${client_host}/${login}`);
});

export default router;

