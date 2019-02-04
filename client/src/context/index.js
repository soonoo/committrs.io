import React from 'react';

const LocaleContext = React.createContext();
const withLocale = (Component) => (props) => (
  <LocaleContext.Consumer>
    {locale => <Component {...props} locale={locale}/>}
  </LocaleContext.Consumer>
);

export { LocaleContext, withLocale };

