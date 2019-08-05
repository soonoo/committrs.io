import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const rolesMiddleware = (roles) => async (ctx, next) => {
  const { method, url, header } = ctx;
  const { authorization } = header;

  try {
    if(!authorization.startsWith('Bearer ')) throw new Error('token parse error');

    const token = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
    const userRoles = token.roles.map(r => r.toLowerCase());

    for(const role of roles) {
      if(!userRoles.includes(role.toLowerCase())) throw new Erorr(`no role: ${role}`);
    }
    ctx.token = token;
  } catch(e) {
    ctx.status = 403;
    return;
  }

  return next();
};

export default rolesMiddleware;

