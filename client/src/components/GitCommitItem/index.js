import React from 'react';
import { shape, string, nonNegativeNumber } from 'prop-types';

const GitCommitItem = ({ commitInfo }) => {
  return (
    <div>
      <p className='commit-hash'>{commitInfo.hash}</p>
      <p className='commit-message'>{commitInfo.message}</p>
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
    hash: string.isRequired,
    message: string.isRequired,
    stat: shape({
      added: positiveNumberValidator,
      deleted: positiveNumberValidator,
    }),
  }),
};

export default GitCommitItem;

