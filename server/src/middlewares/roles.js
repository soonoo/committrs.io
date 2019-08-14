import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const rolesMiddleware = (roles) => async (ctx, next) => {
  const { authorization } = ctx.header;

  if(!Array.isArray(roles) && typeof roles !== 'string') return;
  const rolesToBeVerified = [].concat(roles);

  try {
    const parsedToken = authorization.split(' ');
    if(parsedToken.length !== 2) {
      throw new Error(`authorization header is longer than or shorter than expected: ${authorization}`);
    }
    if(parsedToken[0].toLowerCase() !== 'bearer') {
      throw new Error(`token type is invalid: ${parsedToken[1]}`);
    }

    const token = jwt.verify(parsedToken[1], process.env.JWT_SECRET);
    const userRoles = token.roles.map(r => r.toLowerCase());

    for(const role of rolesToBeVerified) {
      if(!userRoles.includes(role.toLowerCase())) throw new Erorr(`no role: ${role}`);
    }
    ctx.token = token;
  } catch(e) {
    console.error('rolesMiddleware:  ' + e);
    ctx.status = 403;
    return;
  }

  return next();
};

export default rolesMiddleware;

