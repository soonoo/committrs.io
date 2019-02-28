import React from 'react';
import PropTypes from 'prop-types';
import GitCommitList from '../GitCommitList';

class UserRepoItem extends React.Component {
  state = {
    commitListVisibility: false,
  }

  toggleCommitListVisibility = () => {
    this.setState({
      ...this.state,
      commitListVisibility: !this.state.commitListVisibility,
    });
  }

  render = () => {
    const { owner, name, commitsCount, commits } = this.props;
    const repoPath = `${owner}/${name}`;

    return (
      <div onClick={this.toggleCommitListVisibility}>
        <div>{`${owner}/${name}`}</div>
        <div>{commitsCount}</div>
        {this.state.commitListVisibility &&
            <GitCommitList commits={commits} repoPath={repoPath} />}
      </div>
    );
  }
};

const { number, string } = PropTypes;
export const repoShape = {
  owner: string.isRequired,
  name: string.isRequired,
  commitsCount: number.isRequired,
};

UserRepoItem.propTypes = repoShape;

export default UserRepoItem;

