import React from 'react';
import CommitItem from '../CommitItem';
import PropTypes from 'prop-types';

const CommitList = ({ repoPath, commits }) => {
  return (
    <div>
      {commits.map((commit) => {
        commit.repoPath = repoPath;
        return (
          <CommitItem key={commit.hash} commitInfo={commit} />
        );
      })}
    </div>
  );
};

CommitList.propTypes = {
  // TODO: reuse commitInfo prop type.
  repoPath: PropTypes.string.isRequired,
};

export default CommitList;

