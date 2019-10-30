const customCorsMiddleware = () => async (ctx, next) => {
  console.log(ctx.withCredentials)
  if(!ctx.token) {
    ctx.set('Access-Control-Allow-Origin', '*');
  }
  return next();
};

export default customCorsMiddleware;

