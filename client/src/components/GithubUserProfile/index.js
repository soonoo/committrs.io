import React from 'react';
import { shape, string } from 'prop-types';

const GithubUserProfile = ({ profileInfo }) => {
  const { profileImgSrc, userName } = profileInfo;

  return (
    <div>
      <img className='profile-img' src={profileImgSrc} />
      <p className='profile-user'>{userName}</p>
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

