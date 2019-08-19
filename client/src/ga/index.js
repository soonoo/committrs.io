import ReactGA from 'react-ga';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  init: () => {
    if(!isProduction) return;
    ReactGA.initialize('UA-145909440-1');
  },

  pageView: (page = '') => {
    if(!isProduction) return;
    ReactGA.pageview(page);
  },
};

