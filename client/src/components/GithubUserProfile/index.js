import React from 'react';
import { shape, string } from 'prop-types';

import './GithubUserProfile.css';

const GithubUserProfile = React.memo(({ profileInfo }) => {
  const { avatarUrl, name } = profileInfo;

  return (
    <div className='github-profile'>
      <img alt='github user profile' src={avatarUrl} />
      <div className='container'>
        <div className='name'>{name}</div>
      </div>
    </div>
  );
});

GithubUserProfile.propTypes = {
  profileInfo: shape({
    avatarUrl: string.isRequired,
    userName: string.isRequired,
  }),
};

export default GithubUserProfile;

