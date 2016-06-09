import { MESSAGE_NOTIFY, MESSAGES_CLEAR } from '../constants/actionTypes';

//state tree contains always a single message at a time
function notificationsReducer(state = [], action) {
  switch (action.type) {

    case MESSAGE_NOTIFY:
      return [action.payload];

    case MESSAGES_CLEAR:
      return [];

    default:
      return state;
  }
}

export default notificationsReducer;
