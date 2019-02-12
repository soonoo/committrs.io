const newUserHandler = require('./newUserHandler');
const syncUserHandler = require('./syncUserHandler');

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

module.exports = handler;

