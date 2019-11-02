import { BACKEND_HOST } from '../../constants';
import axios from 'axios';
import _ from 'lodash';

// github api client
import octokit from '../../connections/octokit';
import { delimiters } from '../../constants';
import { pull, clone, log, splitCommits, rmGitDirectory } from '../../utils';
import fs from 'fs';

const maxRepoSizeInMegaBytes = 500;

const getUserRepos = async (username) => {
  let page = 1;
  let repoData = [];
  let tempRepoList;
  let orgsData = [];
  let tempOrgsList;
  const per_page = 100;

  do {
    try {
      tempRepoList = await octokit.repos.listForUser({ username, per_page, page: page++ })
      repoData = repoData.concat(tempRepoList.data);
      console.log('user repos: ', repoData.length)
    } catch(e) {
      console.error(e);
    }
  } while(tempRepoList.data.length === 100);

  page = 1;
  do {
    try {
      tempOrgsList = await octokit.orgs.listForUser({ username, per_page, page: page++ })
      orgsData = orgsData.concat(tempOrgsList.data);
      console.log('orgs: ', orgsData.length)
    } catch(e) {
      console.error(e);
    }
  } while(tempOrgsList.data.length === 100);

  let rr;
  for(const org of orgsData) {
    page = 1;
    do {
      rr = await octokit.repos.listForOrg({ org: org.login, per_page, page: page++ });
      repoData = repoData.concat(rr.data);
      console.log('user repos: ', repoData.length)
    } while(rr.data.length === 100);
  }

  console.log(repoData.length)
  return repoData;
}

const getValidRepos = async (repos, minimumStarCount) => {
  let i = 0;
  const repoList = [];

  console.log('callint getValidRepos with count: ', repos.length)
  for(const repo of repos) {
    console.log('checking ' + repo.owner + '/'+  repo.name)
    try {
      if(repo.stargazers_count >= minimumStarCount) {
        if((repo.size / 1024) > maxRepoSizeInMegaBytes) {
          console.log(repo.owner + '/'+  repo.name + ' too big')
          continue;
        }
        repoList.push({ owner: repo.owner.login, name: repo.name, starsCount: repo.stargazers_count, description: repo.description });
      }
      if(repo.fork) {
        const r = await octokit.repos.get({ owner: repo.owner.login, repo: repo.name });
        const rrr = await octokit.repos.get({ owner: r.data.parent.owner.login, repo: r.data.parent.name });
        if((rrr.data.size / 1024) > maxRepoSizeInMegaBytes) {
          console.log(repo.data.owner + '/' + rrr.data.name + ' too big')
          continue;
        }
        if(r.data.parent.stargazers_count >= minimumStarCount) {
          repoList.push({ owner: r.data.parent.owner.login, name: r.data.parent.name, starsCount: r.data.parent.stargazers_count, description: r.data.parent.description });
        }
      }
    } catch(e) {
      console.error(e);
    }
  }

  console.log(repoList.length)
  return repoList;
}

const refresh = async (cwd, path) => {
  const fullPath = `${cwd}/repos/${path}`;
  try {
    if(fs.existsSync(fullPath)) {
      await pull(fullPath);
    } else {
      await clone(path, fullPath);
    }
  } catch(e) {
    console.error(e);
  }
}

const newUserHandler = async ({ message, token }) => {
  const github_login = message.MessageAttributes.github_login.StringValue;
  const github_name = message.MessageAttributes.github_name.StringValue;
  const minimumStarCount = 30;
  const cwd = process.cwd();
  const instance = axios.create({
    baseURL: BACKEND_HOST,
    headers: {
      Cookie: `cmtrs-token=${token};`,
    },
  });

  const userRepos = await getUserRepos(github_login);
  let validRepos = await getValidRepos(userRepos, minimumStarCount);
  validRepos = validRepos.filter((repo, i) => {
    return validRepos.findIndex(r => r.owner === repo.owner && r.name === repo.name) === i;
  });
  console.log('un-filtered validRepos lenght: ' + validRepos.length)
  console.log('filtered validRepos lenght: ' + validRepos.length)

  const { data: { id: userId } } = await instance.get(`/v1/users/${github_login}`);

  for(const repo of validRepos) {
    try {
      let languages = await octokit.repos.listLanguages({ owner: repo.owner, repo: repo.name });
      languages = Object.keys(languages.data).join(',');

      const { data: { id: repoId }} = await instance.put(`/v1/repos`, { ...repo, languages });
      await instance.put(`/v1/repos/${repoId}/${userId}`);

      const path = `${repo.owner}/${repo.name}`;
      const fullPath = `${cwd}/repos/${path}`;
      console.log('cloning ' + repo.owner + '/' + repo.name);
      await refresh(cwd, path);

      const gitLog = await log([github_login, github_name].join('|'), fullPath);
      const commits = splitCommits(gitLog);
      console.log('commits count' + commits.length);

      for(const bulk of _.chunk(commits, 500)) {
        await instance.put(`/v1/commits/bulk/${userId}/${repoId}`, bulk);
      }

      await rmGitDirectory(`${cwd}/repos`);
    } catch(e) {
      console.error(e);
    }
  }

  await instance.post(`/v1/users/${userId}/syncStatus`, { name: 'UPDATED' });
};

export default newUserHandler;

