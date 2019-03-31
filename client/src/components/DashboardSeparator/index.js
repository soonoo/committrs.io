import React from 'react';

import './DashboardSeparator.css';

const DashboardSeparator = ({ name }) => {
  return name &&
    <div className='dashboard-separator'>
      {`${name}'s open source contributions`}
    </div>
};

export default DashboardSeparator;

