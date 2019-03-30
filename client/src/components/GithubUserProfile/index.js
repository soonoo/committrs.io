import React from 'react';
import { shape, string } from 'prop-types';

import './GithubUserProfile.css';

const GithubUserProfile = React.memo(({ profileInfo }) => {
  const { avatarUrl, name } = profileInfo;

  return (
    <div className='github-profile'>
      <img alt='github user profile' src={avatarUrl} />
      <div>
        <p>{name}</p>
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

