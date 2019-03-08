import { exec } from 'child_process';

const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) return reject(error);
    return resolve(stdout.trim());
  });
});

export const sleep = async (ms) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(), ms);
});

export const pull = async () => execPromise(`git pull --all`);
export const clone = async (path) => execPromise(`git clone --no-checkout https://github.com/${path} repos/${path}`);
export const log = async (username) => execPromise(`git log --author='${username}' --all --stat --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`);

export const logSince = async (username, since) => execPromise(`git log --author='${username}' --all --stat --since=${since} --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`);

export const splitCommits = (gitLog) =>  {
  const re = /---committrs\/(?:sep|hash|date|subject|body|files_changed)---\n/g;
  const commits = gitLog.split(/---committrs\/sep---/g).slice(1);

  const commitList = commits.map((commit) => {
    const commitData = commit.split(/---committrs\/(?:hash|date|subject|body|files_changed)---\n/g).slice(1);
    return {
      hash: commitData[0],
      date: commitData[1],
      subject: commitData[2],
      body: commitData[3],
      filesChanged: commitData[4],
    };
  });

  return commitList;
};

