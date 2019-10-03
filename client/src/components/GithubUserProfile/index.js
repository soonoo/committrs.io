import React from 'react';
import { shape, string } from 'prop-types';
import ContentLoader from 'react-content-loader';
import SnsShareButtons from 'components/SnsShareButtons';
import { CLIENT_HOST } from '../../constants';

import './GithubUserProfile.css';

const GithubUserProfile = React.memo(({ profileInfo }) => {
  const { avatarUrl, github_login, syncDesc } = profileInfo;
  const url = `${CLIENT_HOST}/${github_login}`;

  return github_login ?
    <div className='github-profile'>
      <span className='img'><img className='img' alt='github user profile' src={avatarUrl} /></span>
      <div>
        <div className='container'>
          <div className='name'>{github_login}</div>
          <SnsShareButtons url={url} />
          <div>
          </div>
          {syncDesc && 
            <div>{syncDesc}</div>
          }
        </div>
      </div>
    </div> : 
    <ContentLoader width='900' height='190' className='github-profile'>
      <rect width='190' height='190' />
      <rect x='220' width='400' height='30' />
      <rect x='220' y='45' width='350' height='20' />
    </ContentLoader>;
});

GithubUserProfile.propTypes = {
  profileInfo: shape({
    avatarUrl: string.isRequired,
    userName: string.isRequired,
  }),
};

export default GithubUserProfile;

