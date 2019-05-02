import Octokit from '@octokit/rest';

const {
  GITHUB_ID: clientId,
  GITHUB_SECRET: clientSecret,
} = process.env;

const octokit = new Octokit({
  auth: {
    clientId,
    clientSecret,
  },
});

export default octokit;

