import React from 'react';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
} from 'react-share';

import './SnsShareButtons.css';

const SnsShareButtons = ({ url }) => {
  const iconSize = 24;

  if(!url) return null;

  return (
    <div>
      Share your profile on: 
      <div className='shareButtonsContainer'>
        <FacebookShareButton url={url}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <RedditIcon size={iconSize} round />
        </RedditShareButton>
      </div>
    </div>
  );
};

export default SnsShareButtons;

