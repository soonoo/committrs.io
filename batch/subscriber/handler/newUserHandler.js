import { BACKEND_HOST } from '../../constants';
import axios from 'axios';
import _ from 'lodash';

// github api client
import octokit from '../../connections/octokit';
import { delimiters } from '../../constants';
import { pull, clone, log, splitCommits, rmGitDirectory } from '../../utils';
import fs from 'fs';

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
    } catch(e) {
      console.error(e);
    }
  } while(tempRepoList.data.length === 100);

  page = 1;
  do {
    try {
      tempOrgsList = await octokit.orgs.listForUser({ username, per_page, page: page++ })
      orgsData = orgsData.concat(tempOrgsList.data);
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
    } while(rr.data.length === 100);
  }

  for(const n of repoData) {
    console.log(n.full_name)
  }

  return repoData;
}

const getValidRepos = async (repos, minimumStarCount) => {
  let i = 0;
  const repoList = [];

  for(const repo of repos) {
    try {
      if(repo.stargazers_count >= minimumStarCount) {
        const rr = await octokit.repos.get({ owner: repo.owner.login, repo: repo.name });
        console.log((rr.data.size / 1024) + 'MB');
        if((rr.data.size / 1024) > 3000) {
          console.log(repo.owner.login, repo.name)
          continue;
        }
        repoList.push({ owner: repo.owner.login, name: repo.name, starsCount: repo.stargazers_count, description: repo.description });
      }
      if(repo.fork) {
        const r = await octokit.repos.get({ owner: repo.owner.login, repo: repo.name });
        const rrr = await octokit.repos.get({ owner: r.data.parent.owner.login, repo: r.data.parent.name });
        console.log((rrr.data.size / 1024) + 'MB');
        if((rrr.data.size / 1024) > 3000) {
          console.log(r.data.parent.owner.login, repo.name)
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
  const username = message.MessageAttributes.username.StringValue;
  const minimumStarCount = 30;
  const cwd = process.cwd();
  const instance = axios.create({
    baseURL: BACKEND_HOST,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userRepos = await getUserRepos(username);
  const validRepos = await getValidRepos(userRepos, minimumStarCount);

  const { data: { id: userId } } = await instance.get(`/v1/users/${username}`);

  for(const repo of validRepos) {
    try {
      const { data: { id: repoId }} = await instance.put(`/v1/repos`, { ...repo });
      await instance.put(`/v1/repos/${repoId}/${userId}`);

      const path = `${repo.owner}/${repo.name}`;
      const fullPath = `${cwd}/repos/${path}`;
      await refresh(cwd, path);

      const gitLog = await log(username, fullPath);
      const commits = splitCommits(gitLog);

      for(const bulk of _.chunk(commits, 500)) {
        await instance.put(`/v1/commits/bulk/${userId}/${repoId}`, bulk);
      }

      await rmGitDirectory(fullPath);
    } catch(e) {
      console.error(e);
    }
  }

  await instance.post(`/v1/users/${userId}/syncStatus`, { name: 'UPDATED' });
};

export default newUserHandler;

