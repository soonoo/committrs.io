const { exec } = require('child_process');

const execPromise = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) return reject(error);
    resolve(stdout.trim());
  });
});

exports.execPromise = execPromise;

