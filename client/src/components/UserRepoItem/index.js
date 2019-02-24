import React from 'react';
import PropTypes from 'prop-types';

const UserRepoItem = ({ owner, name, commitsCount }) => {
  return (
    <div>
      <div>{`${owner}/${name}`}</div>
      <div>{commitsCount}</div>
    </div>
  );
};

const { number, string } = PropTypes;
export const repoShape = {
  owner: string.isRequired,
  name: string.isRequired,
  commitsCount: number.isRequired,
};

UserRepoItem.propTypes = repoShape;

export default UserRepoItem;

