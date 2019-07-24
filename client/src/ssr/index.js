import { createStore, applyMiddleware } from 'redux';
import sagaMiddleware, { rootSaga } from 'store/sagas';
import reducer from 'store/reducers';
import Koa from 'koa';
import Router from 'koa-router';
import { Provider } from 'react-redux';
import App from '../App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { readFileSync } from 'fs';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import serverless from 'serverless-http';
import routes from 'constants/routes';
import { END } from 'redux-saga';

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx, next) => {
  const middleware = sagaMiddleware();
  const store = createStore(
    reducer,
    applyMiddleware(middleware),
  );
  const saga = middleware.run(rootSaga)

  let match;
  const currentRouter = routes.find(r => {
    match = matchPath(ctx.url, { path: r.path, exact: true });
    return match;
  });

  if(currentRouter && currentRouter.loadData) currentRouter.loadData(store, match);
  else store.dispatch(END);

  const template = readFileSync('./build/index.html', { encoding: 'utf-8' });
  await saga.toPromise().then(() => {
    const context = {};
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();

    if(context.status) {
      ctx.status = context.status;
    }

    ctx.body = template
      .replace(
        '<head>',
        `<head>
          ${helmet.meta.toString()}
          ${helmet.title.toString()}`
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )
      .replace(
        '<body>',
        `<body><script>window.__STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}</script>`
      );
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const ssr = serverless(app);
export { ssr };

// app.listen(3001);

