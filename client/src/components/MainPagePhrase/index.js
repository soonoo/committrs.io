import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const MainPagePhrase = () => {
  return (
    <Fragment>
      <h1 className='title'><b>committrs.io</b></h1>
      <div className='title-sub-wrapper'>
        <h2 className='title-sub'>
          What is commitrrs?
        </h2>
        <span className='title-sub-desc'>
          People contibute to various open source projects. 
          However it is difficult to see actual contributions in one place. committrs finds your contributions scattered over open source projects and provides a profile page.
        </span>
      </div>
      <div className='title-sub-wrapper'>
        <h2 className='title-sub'>
          What platform does committrs support?
        </h2>
        <span className='title-sub-desc'>
          committrs.io now only collects your commits in GitHub repository with over 30 stars. 
            Support for other platforms will be added in the future.(e.g. Gitlab, MDN, Wikipedia ... Whatever it is!) Issues and PRs are welcome.
        </span>
      </div>
      <span className='sample-link'>
          You can see the sample profile page before getting started in <Link to='/soonoo'>committrs.io/soonoo</Link>
      </span>
    </Fragment>
  );
};

export default MainPagePhrase;

