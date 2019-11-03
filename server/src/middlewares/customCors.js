const customCorsMiddleware = () => async (ctx, next) => {
  if(!ctx.token) {
    ctx.set('Access-Control-Allow-Origin', '*');
  }
  return next();
};

export default customCorsMiddleware;

