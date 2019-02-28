import React from 'react';
import RepoItem from '../RepoItem';
import PropTypes from 'prop-types';
import { repoShape } from '../RepoItem';

const RepoList = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => {
        return (
          <RepoItem key={repo.id} {...repo} />
        );
      })}
    </div>
  );
};

const { shape, arrayOf } = PropTypes;
RepoList.propTypes = {
  repos: arrayOf(shape(repoShape)),
};

export default RepoList;

