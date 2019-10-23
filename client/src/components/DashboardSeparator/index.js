import React from 'react';
import useUserProfile from  'hooks/useUserProfile';

import './DashboardSeparator.css';

const DashboardSeparator = () => {
  const { github_login: name } = useUserProfile();

  return name ?
    <div className='dashboard-separator'>
      {`${name}'s open source contributions`}
    </div> :
    null
};

export default DashboardSeparator;

