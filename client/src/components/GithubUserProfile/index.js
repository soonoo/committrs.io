import React from 'react';
import { shape, string } from 'prop-types';

const GithubUserProfile = React.memo(({ profileInfo }) => {
  const { avatarUrl, userName } = profileInfo;

  return (
    <div>
      <img alt='github user profile' src={avatarUrl} />
      <p>{userName}</p>
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

