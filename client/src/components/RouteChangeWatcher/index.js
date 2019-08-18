import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import GA from 'ga';

const RouteChangeWatcher = ({ history }) => {
  const { location: { pathname } } = history;

  useEffect(() => {
    GA.pageView(pathname)
  }, [pathname]);

  return null;
};

export default withRouter(RouteChangeWatcher);

