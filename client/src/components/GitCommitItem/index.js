import React from 'react';
import { shape, string } from 'prop-types';

const GitCommitItem = ({ commitInfo }) => {
  const { hash, message, repoPath, stat } = commitInfo;
  const commitLink = `https://github.com/${repoPath}/commit/${hash}`;

  return (
    <div>
      <p className='commit-hash'>
        <a className='commit-link' href={commitLink}>{hash}</a>
      </p>
      <p className='commit-message'>{message}</p>
      <p>
        <span className='commit-addition'>{stat.addition}</span>
        <span className='commit-deletion'>{stat.deletion}</span>
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

GitCommitItem.propTypes = {
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

export default GitCommitItem;

