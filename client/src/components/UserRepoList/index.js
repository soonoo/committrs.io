import React from 'react';
import UserRepoItem from '../UserRepoItem';
import PropTypes from 'prop-types';
import { repoShape } from '../UserRepoItem';

const UserRepoList = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => {
        return (
          <UserRepoItem key={repo.id} {...repo} />
        );
      })}
    </div>
  );
};

const { shape, arrayOf } = PropTypes;
UserRepoList.propTypes = {
  repos: arrayOf(shape(repoShape)),
};

export default UserRepoList;

