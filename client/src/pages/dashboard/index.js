import React, { useEffect, Fragment } from 'react';
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
import NotFound from 'pages/notFound';
import { USER_NOT_FOUND, USER_INITIAL } from 'store/actions/user';
import { Helmet } from 'react-helmet';

import './dashboard.css';

const DashboardPage = ({ profileInfo, repos, commits, match, fetchReposRequest, fetchUserRequest, fetchCommitsRequest, staticContext = {} }) => {
  useEffect(() => {
    if(profileInfo.id !== USER_INITIAL) return;
    fetchUserRequest(match.params.userName);
  }, []);

  // useEffect(() => {
  //   if(profileInfo.id === 0) return;
  //   fetchReposRequest(profileInfo.id);
  // }, [profileInfo.id]);

  if(profileInfo.id === USER_NOT_FOUND) {
    return <NotFound staticContext={staticContext} />;
  }

  return (
    <div>
        {profileInfo.name && 
      <Helmet>
            <title>{`${profileInfo.name} - committrs.io`}</title>
            <meta
              name='description'
              content={`Check out ${profileInfo.name}'s open source contributions!`}
            />
            <meta property='og:title' content={`${profileInfo.name} - committrs.io`} />
            <meta property='og:site_name' content='committrs.io' />
            <meta property='og:type' content='profile' />
            <meta property='og:image' content={profileInfo.avatarUrl} />
            <meta property='og:url' content={`https://committrs.io/${profileInfo.name}`} />
            <meta property='og:description' content={`Check out ${profileInfo.name}'s open source contributions!`} />
      </Helmet>
        }
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

