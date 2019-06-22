import React from 'react';
import { shape, string } from 'prop-types';

import './CommitItem.css';

const CommitItem = ({ commitInfo }) => {
  const { hash, message, repoPath, stat } = commitInfo;
  const commitLink = `https://github.com/${repoPath}/commit/${hash}`;

  return (
    <div className='commit'>
      <p>
        <a href={commitLink}>{hash.slice(0, 25)}</a>
      </p>
      <p>{message}</p>
      <p>
        {/*<span>{stat.addition}</span>*/}
        {/*<span>{stat.addition}</span>*/}
      </p>
    </div>
  );
};

const positiveNumberValidator = (props, propName, componentName) => {
  const prop = props[propName];
  if(!props[propName] || typeof prop !== 'number' || prop < 0) {
    return new Error(`Invalid prop: ${propName}, this should be bigger than 0.`)
  }
};

CommitItem.propTypes = {
  commitInfo: shape ({
    repoPath: string.isRequired,
    hash: string.isRequired,
    message: string.isRequired,
    stat: shape({
      addition: positiveNumberValidator,
      deletion: positiveNumberValidator,
    }),
  }).isRequired,
};

export default CommitItem;

