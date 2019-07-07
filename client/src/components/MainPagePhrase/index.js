import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MainPagePhrase = () => {
  return (
    <Fragment>
      <h1 className='title'>Collect your contributions to open source projects.</h1>
      <div className='title-sub'>
        <h2>
          What is commitrrs?
        </h2>
        <span>
          People contibute to various open source projects. 
          However it is difficult to see actual contributions in one place. committrs finds your contributions scattered over open source projects and provides a profile page.
        </span>
      </div>
      <div className='title-sub'>
        <h2>
          What platform does committrs support?
        </h2>
        <span>
          committrs.io now only collects your commits in GitHub repository with over 30 stars. 
          Support for other platforms(e.g. Gitlab) will be added in the future.
        </span>
      </div>
      <span className='sample-link'>
          You can see the sample profile page before getting started in <Link to='/soonoo'>committrs.io/soonoo</Link>
      </span>
    </Fragment>
  );
};

export default MainPagePhrase;

