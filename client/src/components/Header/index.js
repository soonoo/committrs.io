import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as GithubLogo } from 'images/github-logo.svg';
import { ReactComponent as CmtrsLogo } from 'images/cmtrs-logo.svg';

import './Header.css';

const Header = () => (
  <div className='layout-header'>
    <div className='layout-header-link'><Link to='/'><CmtrsLogo /></Link></div>
    <div className='right-pane'>
      <Link className='repo-link' to='https://github.com/soonoo/committrs.io' target='_blank' rel='noopener noreferrer'>
        <GithubLogo />
      </Link>
    </div>
  </div>
);

export default Header;

