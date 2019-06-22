import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommitItem from '../CommitItem';

import './RepoItem.css';

const RepoItem = ({ owner, name, id: repoId, totalCommits, commits, fetchCommits, userId }) => {
  const [listVisibility, setListVisibility] = useState(false);
  const repoPath = `${owner}/${name}`;
  const dataKey = `${userId}/${repoId}`;
  const data = commits[dataKey] || [];

  const onRepoClick = () => {
    if(!listVisibility) fetchCommits(userId, repoId);
    setListVisibility(!listVisibility)
  };

  const repoClassName = 'repo ' + (listVisibility ? 'visible' : '');

  return (
    <div className={repoClassName}>
      <div className='repo-title' onClick={onRepoClick}>{repoPath}</div>
      <div className='repo-commits-count'>{`${totalCommits} commits`}</div>
      {listVisibility &&
          <div className='commit-container'>
            <div>
              {data.length ? data.map((commit) => {
                commit.repoPath = repoPath;
                return <CommitItem key={commit.hash} commitInfo={commit} />;
              }) : 'Loading ...'}
            </div>
          </div>
      }
    </div>
  );
};

const { number, string } = PropTypes;
export const repoShape = {
  owner: string.isRequired,
  name: string.isRequired,
  id: number.isRequired,
  totalCommits: number.isRequired,
  userId: number.isRequired,
};

RepoItem.propTypes = repoShape;

export default RepoItem;

