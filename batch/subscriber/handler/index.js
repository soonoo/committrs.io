const newUserHandler = require('./newUserHandler');
const syncUserHandler = require('./syncUserHandler');

const handler = (message) => {
  const { type, id } = message.attributes;

  switch(type) {
    case 'NEW_USER':
      return newUserHandler();
    case 'SYNC_UESR':
      return syncUserHandler();
    default:
      console.log(id);
      message.ack();
  }
};

module.exports = handler;

