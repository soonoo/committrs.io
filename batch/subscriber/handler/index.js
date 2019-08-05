import newUserHandler from './newUserHandler';
import syncUserHandler from './syncUserHandler';

const handler = async (message) => {
  try {
    const { type } = message.MessageAttributes;

    switch(type.StringValue) {
      case 'NEW_USER':
        await newUserHandler(message);
        return;
      case 'SYNC_UESR':
        await syncUserHandler(message);
        return;
      default:
        return;
    }
  } catch(e) {
    console.error(e)
  }
};

export default handler;

