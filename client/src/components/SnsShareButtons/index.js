import React from 'react';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  RedditShareButton, RedditIcon,
} from 'react-share';

import './SnsShareButtons.css';

const SnsShareButtons = ({ url }) => {
  const iconSize = 24;

  if(!url) return null;

  return (
    <div className='shareButtonsContainer'>
      <FacebookShareButton url={url}>
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={iconSize} round />
      </RedditShareButton>
    </div>
  );
};

export default SnsShareButtons;

