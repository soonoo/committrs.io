const { pull, logSince, log } = require('../../utils');

const syncUserHandler = async (message) => {
  // TODO: get list of not updated repos from database
  const repos = [];

  for(repo of repos) {
    process.cwd(repo.path);

    await pull();

    // TODO: get list of users who has/forked `repo`
    const users = [];

    for(user of user) {
      // TODO: get list of commits after
      const commits = [];

      // TODO: add commits to database
    }
  }
};

module.exports = syncUserHandler;

