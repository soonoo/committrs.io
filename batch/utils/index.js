import { exec } from 'child_process';

const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, { maxBuffer: 1024 * 100000 }, (error, stdout, stderr) => {
    if (error) return reject(error);
    return resolve(stdout.trim());
  });
});

export const sleep = async (ms) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(), ms);
});


export const rmGitDirectory = (path) => {
  const command = `rm -rf ${path}`
  return execPromise(command);
};

export const pull = async (fullPath) => {
  const command = `git -C ${fullPath} pull --all`;
  return execPromise(command);
};

export const clone = async (path, fullPath) => {
  const command = `git clone https://github.com/${path} ${fullPath}`;
  return execPromise(command);
};

export const log = async (username, fullPath) => {
  const command = `git -C ${fullPath} log -E -i \
    --author='${username}' --all --stat --pretty=format:'\
    ---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n\
    ---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`;

  return execPromise(command);
};

export const logSince = async (username, since) => {
  const command = `git log \
    --author='${username}' --all --stat --since=${since} \
    --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n \
    ---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b \
    ---committrs/files_changed---'`;

  return execPromise();
};

export const splitCommits = (gitLog) =>  {
  const re = /---committrs\/(?:sep|hash|date|subject|body|files_changed)---\n/g;
  const commits = gitLog.split(/---committrs\/sep---/g).slice(1);

  const commitList = commits.map((commit) => {
    const commitData = commit.split(/---committrs\/(?:hash|date|subject|body|files_changed)---\n/g).slice(1);
    return {
      hash: commitData[0].replace('\n', ''),
      date: commitData[1].replace('\n', '').trim(),
      subject: commitData[2],
      body: commitData[3],
      filesChanged: commitData[4],
    };
  });

  return commitList;
};

