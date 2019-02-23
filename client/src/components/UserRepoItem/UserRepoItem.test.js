import React from 'react';
import { render } from 'react-testing-library';
import UserRepoItem from './';

const props = {
  owner: 'soonoo',
  name: 'committrs',
  commitsCount: 123,
};
let wrap;

describe('UserRepoItem.js', () => {
  it('renders without crashing', () => {
    wrap = render(<UserRepoItem {...props} />);
  });

  it('renders repo owner and name in `owner/name` form', () => {
    const { owner, name } = props;
    expect(wrap.getByText(`${owner}/${name}`)).not.toBeNull();
  });

  it('renders total count of commits in repo', () => {
    const { commitsCount } = props;
    expect(wrap.getByText(`${commitsCount}`)).not.toBeNull();
  });
});

