import React from 'react';
import { render } from 'react-testing-library';
import UserRepoItem from './';

const props = {
  owner: 'soonoo',
  name: 'committrs',
  commitsCount: 123,
};

describe('UserRepoItem.js', () => {
  const { getByText } = render(<UserRepoItem {...props} />);
  const { owner, name, commitsCount } = props;

  it('renders repo owner and name in `owner/name` form', () => {
    expect(getByText(`${owner}/${name}`)).toBeDefined();
  });

  it('renders total count of commits in repo', () => {
    expect(getByText(commitsCount.toString())).toBeDefined();
  });
});

