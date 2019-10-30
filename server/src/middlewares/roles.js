import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const rolesMiddleware = (roles) => async (ctx, next) => {
  const tokenFromCookie = ctx.cookies.get('cmtrs-token');

  if(!Array.isArray(roles) && typeof roles !== 'string') return;
  const rolesToBeVerified = [].concat(roles);

  try {
    const token = jwt.verify(tokenFromCookie, process.env.JWT_SECRET);
    const userRoles = token.roles.map(r => r.toLowerCase());

    for(const role of rolesToBeVerified) {
      if(!userRoles.includes(role.toLowerCase())) throw new Erorr(`no role: ${role}`);
    }
  } catch(e) {
    console.error('rolesMiddleware:  ' + e);
    ctx.status = 403;
    return;
  }

  return next();
};

export default rolesMiddleware;

