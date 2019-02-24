import React from 'react';
import { shape, string } from 'prop-types';

const GithubUserProfile = ({ profileInfo }) => {
  const { profileImgSrc, userName } = profileInfo;

  return (
    <div>
      <img alt='github user profile image' src={profileImgSrc} />
      <p>{userName}</p>
    </div>
  );
};

GithubUserProfile.propTypes = {
  profileInfo: shape({
    profileImgSrc: string.isRequired,
    userName: string.isRequired,
  }),
};

export default GithubUserProfile;

