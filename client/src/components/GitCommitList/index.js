import React from 'react';
import GitCommitItem from '../GitCommitItem';
import PropTypes from 'prop-types';

const GitCommitList = ({ repoPath, commits }) => {
  return (
    <div>
      <p className='repo-path'>
        <a className='repo-link' href={`https://github.com/${repoPath}`}>{repoPath}</a>
      </p>
      {commits.map((commit) => {
        commit.repoPath = repoPath;
        return (
          <GitCommitItem key={commit} commitInfo={commit} />
        );
      })}
    </div>
  );
};

GitCommitList.propTypes = {
  // TODO: reuse commitInfo prop type.
  repoPath: PropTypes.string.isRequired,
};

export default GitCommitList;

