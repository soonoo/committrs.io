import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GithubUserProfile from 'components/GithubUserProfile';
import RepoList from 'components/RepoList';
import { fetchReposRequest } from 'store/actions/repos';
import { fetchUserRequest } from 'store/actions/user';
import { fetchCommitsRequest } from 'store/actions/commits';

const DashboardPage = ({ profileInfo, repos, commits, match, fetchReposRequest, fetchUserRequest, fetchCommitsRequest }) => {
  useEffect(() => {
    fetchUserRequest(match.params.userName);
  }, []);

  useEffect(() => {
    if(profileInfo.id === 0) return;
    fetchReposRequest(profileInfo.id);
  }, [profileInfo.id]);

  return (
    <div>
      <GithubUserProfile
        profileInfo={profileInfo}
      />
      <RepoList
        repos={repos}
        fetchCommits={fetchCommitsRequest}
        userId={profileInfo.id}
        commits={commits}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileInfo: state.user,
  repos: state.repos,
  commits: state.commits,
});

const mapDispatchToProps = {
  fetchReposRequest,
  fetchUserRequest,
  fetchCommitsRequest,
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DashboardPage);

