const { exec } = require('child_process');

const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) return reject(error);
    resolve(stdout.trim());
  });
});

module.exports = {
  pull: async () => execPromise(`git pull --all`),
  clone: async (path) => execPromise(`git clone --no-checkout https://github.com/${path} repos/${path}`),
  log: async (username) => execPromise(`git log --author='${username}' --all --stat --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`),

  // TODO: --since flag should be added to command
  logSince: async (username, since) => execPromise(`git log --author='${username}' --all --stat --since=${since} --pretty=format:'---committrs/sep---%n---committrs/hash---%n%H%n---committrs/date---%n%aI%n---committrs/subject---%n%s%n---committrs/body---%n%b---committrs/files_changed---'`),
};

