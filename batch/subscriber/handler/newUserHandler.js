const sequelize = require('../../../server/db');
const User = require('../../../server/db/model/User');
const Commit = require('../../../server/db/model/Commit');
const Repo = require('../../../server/db/model/Repo');

// repo - user
Repo.belongsToMany(User, { through: 'UserRepo' });
User.belongsToMany(Repo, { through: 'UserRepo' });

// user - commit
User.hasMany(Commit);

// repo - commit
Repo.hasMany(Commit);

// github api client
const octokit = require('../../connections/octokit');
const execPromise = require('../../utils/execPromise');
const { delimiters } = require('../../constants');

const userRepos = async (username) => {
  let page = 1;
  let repoData = [];
  let tempRepoList;

  do {
    tempRepoList = await octokit.repos.listForUser({ username, per_page: 100, page })
    repoData = repoData.concat(tempRepoList.data);
    page++;
  } while(tempRepoList.data.length === 100);
}

const validRepos = async (repos, minimumStarCount) => {
  let i = 0;

  let repoList = await Promise.all(repos.map((repo) => {
    if(repo.fork === false && repo.stargazers_count < minimumStarCount) return;
    else return octokit.repos.get({ owner: username, repo: repo.name });
  })); 
  repoList = repoList.filter(repo => repo);
}

const newUserHandler = async (message) => {
  message.ack();
  const { username } = message.attributes;
  const minimumStarCount = 30;
  const cwd = process.cwd();

  // sync db
  await sequelize.sync({ force: true });

  const userRepos = await userRepos(username);
  const validRepose = await validRepos(userRepos, minimumStarCount);

  const user = await User.create({ name: username, });

  // TODO: check repo validity(ex. stargazers_count)
  for(repo of validRepos) {
    const repo_path = repo.data.fork ? repo.data.parent.full_name : repo.data.full_name;
    const createdRepo = await Repo.create({ name: repo_path, owner: repo_path });
    await user.addRepo(createdRepo);

    if((repo.data.source ? repo.data.source.stargazers_count : repo.data.stargazers_count) < minimumStarCount) continue;

    try {
      // TODO: `git clone` exits when directory already exists
      process.chdir(`${cwd}`)
      await execPromise(`git clone --no-checkout https://github.com/${repo_path} repos/${repo_path}`);
      process.chdir(`${cwd}/repos/${repo_path}`);

      let log = await execPromise(`git log --author='${username}' --all --stat --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`);

      const commits = log.split('---committrs/sep---').slice(1);
      for(commit of commits) {
        const commitData = commit.split(new RegExp(delimiters.join('|'), 'g')).slice(1);
        const hash = commitData[0];
        const userId = user.get('id');
        const repoId = createdRepo.get('id');

        await Commit.create({ hash, userId, repoId });
      }
    } catch(e) {
      continue;
    }
  }
};

module.exports = newUserHandler;

