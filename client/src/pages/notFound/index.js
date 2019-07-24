import React from 'react';

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <div>
      NOT FOUND
    </div>
  );
};

export default NotFound;

