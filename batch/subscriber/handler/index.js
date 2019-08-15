import newUserHandler from './newUserHandler';
import syncUserHandler from './syncUserHandler';
import axios from 'axios';
import { BACKEND_HOST } from '../../constants/';

let tokenResponse;
const handler = async (message) => {
  if(!token){
    tokenResponse = await axios.post(`${BACKEND_HOST}/v1/auth/admin/token`, { code: process.env.ADMIN_SECRET_CODE });
  }
  const token = tokenResponse.data;
  console.log('new message :' + message);

  try {
    const { type } = message.MessageAttributes;

    switch(type.StringValue) {
      case 'NEW_USER':
        await newUserHandler({ message, token });
        return;
      case 'SYNC_UESR':
        await syncUserHandler({ message, token });
        return;
      default:
        return;
    }
  } catch(e) {
    console.error(e)
  }
};

export default handler;

