import { ADD_NOTI, REMOVE_NOTI_AFTER_TIMEOUT } from 'store/actions/noti';

const initialState = [];

let id = 1;
const notiReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_NOTI:
      const newMessage = {
        ...action.payload,
        visible: true,
        id: id++,
      };
      return [newMessage, ...state];

    case REMOVE_NOTI_AFTER_TIMEOUT:
      const notiIndex = state.findIndex(n => n.id === action.payload.id);
      if(notiIndex === -1) return state;

      return [
        ...state.slice(0, notiIndex),
        { ...state[notiIndex], visible: false },
        ...state.slice(notiIndex + 1)
      ];

    default:
      return state;
  }
};

export default notiReducer;

