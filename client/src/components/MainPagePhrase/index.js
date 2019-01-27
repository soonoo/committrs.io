import React from 'react';
import PropTypes from 'prop-types';

const MainPagePhrase = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
};

MainPagePhrase.propTypes = {
  text: PropTypes.string.isRequired,
};

export default MainPagePhrase;

