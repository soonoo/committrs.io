import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { addNoti, removeNotiAfterTimeout } from 'store/actions/noti';
import { modifyUserRequest } from 'store/actions/user';
import { AUTH_STATUS } from 'store/reducers/auth';
import { GITHUB_LOGIN_URL } from 'constants/index';
import uuid from 'uuid/v4';

import './settings.css';

const login = () => {
  window.location.href = `${GITHUB_LOGIN_URL}?redirect_to=${encodeURI(window.location.href)}`;
};

const SettingsPage = ({ staticContext = {} }) => {
  const dispatch = useDispatch();
  const { github_login, avatarUrl, id, mdn_name } = useSelector(state => state.auth);
  const { authorized } = useSelector(state => state.auth);
  const [mdnName, setMdnName] = useState(mdn_name);

  useEffect(() => {
    const messageId = uuid();
    if(authorized === AUTH_STATUS.NOT_LOGGED_IN) {
      dispatch(addNoti('Click me to sign in first! 😄', login, 1000000, messageId));
    }
    return () => dispatch(removeNotiAfterTimeout(messageId));
  }, [authorized]);

  useEffect(() => {
    setMdnName(mdn_name);
  }, [mdn_name]);

  const onChange = (e) => {
    setMdnName(e.target.value);
  };

  const changeMdnName = (id, mdnName) => () => {
    if(mdn_name === mdnName) return;
    dispatch(modifyUserRequest(id, { mdn_name: mdnName }));
  };

  return (
    <div>
      <Header />
      <div className='settings'>
        <div className='wrapper'>
          <h1>Settings</h1>
          <h2 className='SettingsMenu'>Connected accounts</h2>
            <hr />
            <div className='AccountWrapper'>
              <span className='Account'>GitHub</span>
              <input className='AccountInput' value={github_login} disabled />
            </div>
            <div className='AccountWrapper'>
              <span className='Account'>MDN username</span>
              <input size={1} className='AccountInput' value={mdnName} onChange={onChange} />
              <button className='AccountChangeButton' onClick={changeMdnName(id, mdnName)}>change</button>
            </div>
            <div>
              <span className='MdnAccountGuide'>IMPORTANT</span>
              : Please display your GitHub profile in MDN profile settings to verify ownership.<br />
                (You can find the opiton in 'Edit Profile' > 'My Profiles' menu after signing in <a href='https://developer.mozilla.org/en-US/' target='_blank'>MDN</a>.)
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

