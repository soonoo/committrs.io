import React from 'react';
import { withLocale } from 'context';
import languagePack from 'constants/languagePack';

const MainPagePhrase = ({ locale }) => {
  return (
    <h1>{languagePack[locale]['landingPage']}</h1>
  );
};

export default withLocale(MainPagePhrase);

