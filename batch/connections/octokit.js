// github api client
import Octokit from '@octokit/rest';
const octokit = new Octokit({
  auth: {
    username: 'soonoo',
    password: 'ehqps2m7',

    // TODO: what is the purpose of this function???
    async on2Fa() {
      return prompt('Two factor: ');
    },
  }
});

export default octokit;

