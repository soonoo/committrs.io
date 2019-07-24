import React from 'react';
import { Link } from 'react-router-dom';
import CmtrsLogo from 'components/CmtrsLogo';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

import './Header.css';

const Header = () => (
  <div className='layout-header'>
    <div className='layout-header-link'><Link to='/'><CmtrsLogo className='cmtrs-logo' /></Link></div>
    <div className='right-pane'>
      <a className='repo-link' href='https://github.com/soonoo/committrs.io' target='_blank' rel='noopener noreferrer'>
        <GoMarkGithub color='white' />
      </a>
    </div>
  </div>
);

export default Header;

