import React, { useEffect, Fragment } from 'react';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GithubUserProfile from 'components/GithubUserProfile';
import DashboardSeparator from 'components/DashboardSeparator';
import RepoList from 'components/RepoList';
import Header from 'components/Header';
import { fetchUserRequest } from 'store/actions/user';
import NotFound from 'pages/notFound';
import { USER_NOT_FOUND, USER_INITIAL } from 'store/actions/user';
import { Helmet } from 'react-helmet';

import './dashboard.css';

const DashboardPage = ({ match, staticContext = {} }) => {
  const dispatch = useDispatch();
  const { github_login, avatarUrl, id }= useSelector(state => state.user);

  useEffect(() => {
    if(id !== USER_INITIAL) return;
    dispatch(fetchUserRequest(match.params.userName));
  }, []);

  if(id === USER_NOT_FOUND) {
    return <NotFound staticContext={staticContext} />;
  }

  return (
    <div>
        {github_login &&
      <Helmet>
        <title>{`${github_login}`}</title>
        <meta
          name='description'
          content={`Check out ${github_login}'s open source contributions!`}
        />
        <meta property='og:title' content={`${github_login}`} />
        <meta property='og:site_name' content='committrs.io' />
        <meta property='og:type' content='profile' />
        <meta property='og:image' content={avatarUrl} />
        <meta property='og:description' content={`Check out ${github_login}'s open source contributions!`} />
      </Helmet>
        }
      <Header />
      <div className='dashboard'>
        <GithubUserProfile />
        <DashboardSeparator />
        <RepoList />
      </div>
    </div>
  );
};

export default withRouter(DashboardPage);

