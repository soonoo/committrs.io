import React from 'react';
import { useSelector } from 'react-redux';

import './DashboardSeparator.css';

const DashboardSeparator = () => {
  const { github_login: name } = useSelector(state => state.user);

  return name &&
    <div className='dashboard-separator'>
      {`${name}'s open source contributions`}
    </div>
};

export default DashboardSeparator;

