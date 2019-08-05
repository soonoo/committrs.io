import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  const style = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '40px',
    fontWeight: '300',
    alignItems: 'center',
    padding: '20px 0',
  };

  return (
    <div style={style}>
      <div>NOT FOUND</div>
      <br />
      <div>ㅠ.ㅠ</div>
      <br />
      <div><Link to='/'>goto home;</Link></div>
    </div>
  );
};

export default NotFound;

