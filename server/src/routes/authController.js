import User from '../../db/model/User';
import { sqsNewUser } from '../service/sqs';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { createUser, findUser } from '../service/userService';
import { adminTokenRequestSchema } from '../schema';

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
  const user = await findUser(login);
  if(!user) {
    await createUser({
      name: login,
      token: access_token,
      email,
      avatarUrl: avatar_url,
    });

    sqsNewUser(login);
  }

  const token = jwt.sign({ name: login, avatarUrl: avatar_url, roles: ['user'] }, JWT_SECRET);
  ctx.cookies.set('cmtrs-token', token, { domain: client_host });
  ctx.redirect(`${client_host}/${login}`);
});

router.post('/admin/token', async (ctx) => {
  const isValid = await adminTokenRequestSchema.isValid(ctx.request.body);
  if(!isValid) {
    ctx.status = 400;
    return;
  }

  const { ADMIN_SECRET_CODE, JWT_SECRET } = process.env;
  const { code } = ctx.request.body;

  if(ADMIN_SECRET_CODE !== code) {
    ctx.status = 401;
    return;
  }

  ctx.body = jwt.sign({ name: 'admin', roles: ['admin'] }, JWT_SECRET);
});

export default router;

