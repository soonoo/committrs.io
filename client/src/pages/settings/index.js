import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { addNoti } from 'store/actions/noti';
import { AUTH_STATUS } from 'store/reducers/auth';
import { GITHUB_LOGIN_URL } from 'constants/index';

import './settings.css';

const login = () => {
  window.location.href = `${GITHUB_LOGIN_URL}?redirect_to=${encodeURI(window.location.href)}`;
};

const SettingsPage = ({ staticContext = {} }) => {
  const dispatch = useDispatch();
  const { github_login, avatarUrl, id } = useSelector(state => state.user);
  const { authorized } = useSelector(state => state.auth);

  if(authorized === AUTH_STATUS.NOT_LOGGED_IN) {
    dispatch(addNoti('Sign in first please 😄  Click me to sign in!', login, 1000000));
  }

  return (
    <div>
      <Header />
      <div className='settings'>
        <div className='wrapper'>
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

