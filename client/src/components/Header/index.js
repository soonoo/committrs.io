import React from 'react';
import { Link } from 'react-router-dom';
import GithubLogo from 'images/github-logo.svg';

import './Header.css';

const Header = () => (
  <div className='layout-header'>
    <div className='layout-header-link'><Link to='/'>committrs</Link></div>
    <div className='right-pane'>
      <Link className='repo-link' to='https://github.com/soonoo/committrs.io' target='_blank' rel='noopener noreferrer'>
        <img src={GithubLogo} />
      </Link>
    </div>
  </div>
);

export default Header;

