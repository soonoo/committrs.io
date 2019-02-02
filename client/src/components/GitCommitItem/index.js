import React from 'react';
import { shape, string } from 'prop-types';

const GitCommitItem = ({ commitInfo }) => {
  const { hash, message, repoPath } = commitInfo;
  const commitLink = `https://github.com/${repoPath}/commit/${hash}`;

  return (
    <div>
      <a className='commit-link' href={commitLink}><p className='commit-hash'>{hash}</p></a>
      <p className='commit-message'>{message}</p>
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
      added: positiveNumberValidator,
      deleted: positiveNumberValidator,
    }),
  }).isRequired,
};

export default GitCommitItem;

