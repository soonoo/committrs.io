import sequelize from '../../../server/db';
import User from '../../../server/db/model/User';
import Commit from '../../../server/db/model/Commit';
import Repo from '../../../server/db/model/Repo';

// github api client
import octokit from '../../connections/octokit';
import { delimiters } from '../../constants';
import { pull, clone, log, splitCommits } from '../../utils';
import fs from 'fs';

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

const refresh = async (cwd, path) => {
  process.chdir(`${cwd}`)
  if(await fs.exists(`repos/${repo_path}`)) {
    process.chdir(`repos/${repo_path}`);
    await pull();
  } else {
    await clone(repo_path);
  }
  process.chdir(`${cwd}/repos/${repo_path}`);
}

const newUserHandler = async (message) => {
  message.ack();
  const { username } = message.attributes;
  const minimumStarCount = 30;
  const cwd = process.cwd();

  // sync db
  await sequelize.sync();

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
      refresh(cwd, path);

      const gitLog = await log(username);
      const rawCommits = splitCommits(gitLog);
      const commits = await Commit.bulkCreate(commits);
      user.addCommits(commits);
      repo.addCommits(commits);
    } catch(e) {
    }
  }
};

export default newUserHandler;

