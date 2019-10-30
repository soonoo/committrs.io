import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const userInfoMiddleware = () => async (ctx, next) => {
  const token = ctx.cookies.get('cmtrs-token');

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);

    ctx.token = {
      ...userInfo,
      authorized: true,
    };
  } catch(e) {
    ctx.token = { authorized: false };
    // delete the cookie
    ctx.cookies.set('cmtrs-token');
  }

  return next();
};

export default userInfoMiddleware;

