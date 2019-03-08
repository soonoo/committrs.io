import newUserHandler from './newUserHandler';
import syncUserHandler from './syncUserHandler';

const handler = async (message) => {
  const { type, id } = message.attributes;

  switch(type) {
    case 'NEW_USER':
      await newUserHandler(message);
    case 'SYNC_UESR':
      await syncUserHandler(message);
    default:
      message.ack();
  }
};

export default handler;

