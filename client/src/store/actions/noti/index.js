export const ADD_NOTI = 'ADD_NOTI';
export const REMOVE_NOTI_AFTER_TIMEOUT = 'REMOVE_NOTI_AFTER_TIMEOUT';

export const addNoti = (message, onClick, timeout, id) => ({
  type: ADD_NOTI,
  payload: {
    message,
    onClick,
    timeout,
    id,
  },
});

export const removeNotiAfterTimeout = (id) => ({
  type: REMOVE_NOTI_AFTER_TIMEOUT,
  payload: {
    id,
  },
});

