import React from 'react';

const UserRepoItem = ({ owner, name, commitsCount }) => {
  return (
    <div>
      <div>{`${owner}/${name}`}</div>
      <div>{commitsCount}</div>
    </div>
  );
};

export default UserRepoItem;

