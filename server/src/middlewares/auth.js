const customTokenName = 'committrs_token';

const auth = async (ctx, next) => {
  const { code } = ctx.query;
  const tokenFromCookie = ctx.cookies.get(customTokenName);
  const { GITHUB_ID: client_id, GITHUB_SECRET: client_secret, JWT_SECRET } = process.env;

  try {
    if(tokenFromCookie) {
      // throws an error if token is invalid
      const decoded = jwt.verify(tokenFromCookie, JWT_SECRET);
    }
    else {
      const oAuthResponse = await fetch(`https://github.com/login/oauth/access_token`, {
        method: 'post',
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { access_token } = await oAuthResponse.json();
      console.log(access_token)
      const userInfoResponse = await fetch(`https://api.github.com/user?access_token=${access_token}`, {
        headers: {
          'Accept': 'application/json'
        },
      });

      if(!userInfoResponse.ok) throw new Error();

      const { avatar_url, name } = await userInfoResponse.json();
      const customToken = jwt.sign({ name }, JWT_SECRET);
      ctx.cookies.set(customTokenName, customToken);
    }
  } catch(e) {
    console.log(e)
    ctx.cookies.set(customTokenName, '');
  } finally {
    if(ctx.path === '/auth/github') ctx.redirect('/');
    else await next();
  }
};

export default auth;

