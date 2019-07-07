import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GithubUserProfile from 'components/GithubUserProfile';
import DashboardSeparator from 'components/DashboardSeparator';
import RepoList from 'components/RepoList';
import Header from 'components/Header';
import { fetchReposRequest } from 'store/actions/repos';
import { fetchUserRequest } from 'store/actions/user';
import { fetchCommitsRequest } from 'store/actions/commits';

import './dashboard.css';

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
      <Header />
      <div className='dashboard'>
        <GithubUserProfile
          profileInfo={profileInfo}
        />
        <DashboardSeparator
          name={profileInfo.name}
        />
          <RepoList
            repos={repos}
            userId={profileInfo.id}
            commits={commits}
            fetchCommits={fetchCommitsRequest}
            userName={profileInfo.name}
          />
      </div>
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

