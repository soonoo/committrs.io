import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useUserProfile from  'hooks/useUserProfile';
import { useParams } from 'react-router-dom';
import GithubUserProfile from 'components/GithubUserProfile';
import DashboardSeparator from 'components/DashboardSeparator';
import RepoList from 'components/RepoList';
import Header from 'components/Header';
import { fetchUserRequest } from 'store/actions/user';
import NotFound from 'pages/notFound';
import { USER_NOT_FOUND } from 'store/actions/user';
import { Helmet } from 'react-helmet';

import './dashboard.css';

const DashboardPage = ({ staticContext = {} }) => {
  const dispatch = useDispatch();
  const { userName } = useParams();
  const { github_login, avatarUrl, id } = useUserProfile();

  useEffect(() => {
    if(!github_login) dispatch(fetchUserRequest(userName));
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
        <div className='wrapper'>
          <GithubUserProfile />
          <DashboardSeparator />
          <RepoList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

