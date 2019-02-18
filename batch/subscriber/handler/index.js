import newUserHandler from './newUserHandler';
import syncUserHandler from './syncUserHandler';

const handler = (message) => {
  const { type, id } = message.attributes;

  switch(type) {
    case 'NEW_USER':
      return newUserHandler(message);
    case 'SYNC_UESR':
      return syncUserHandler(message);
    default:
      message.ack();
  }
};

export default handler;

