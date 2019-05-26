import jwt from 'jsonwebtoken';
import { isAdminRoute } from '../permissions';

const authMiddleware = (ctx, next) => {
  const { method, url, header } = ctx;
  const { authorization } = header;

  try {
    ctx.token = jwt.verify(authorization, process.env.JWT_SECRET);
  } catch(e) {
    // console.error(e);
    ctx.token = {};
  }

  if(ctx.token.admin !== true && isAdminRoute(method, url)) {
    ctx.status = 403;
    return;
  }

  return next();
};

export { authMiddleware };

