import Router from 'koa-router';
const router = new Router();

// TODO: urls have to be refined

// get commits of a user for a repo
router.get('/commits/:username/:owner/:repo', async (ctx) => {

});

// get list of repos for a user
router.get('/repos/:username', async (ctx) => {

});

export default router;

