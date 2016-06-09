import { USER_LOG_OUT, USER_SESSION_RESTORE } from '../constants/actionTypes';

const initialState = {
  user: '',
  instance: null,
  auth: false,
  token: '',
  error: ''
};

function sessionReducer(state = initialState, action) {

  switch (action.type) {

    case 'AUTH_CREATE_REQUEST':
      return Object.assign({}, state, {
        user: action.payload.Login.toUpperCase(),
        instance: action.payload.Instance,
        token: '',
        error: ''
      });

      // case 'AUTH_CREATE_RESPONSE':
      //   return Object.assign({}, state, {
      //     token: action.payload,
      //     auth: true
      //   });

    case 'AUTH_CREATE_FAILURE':
      return Object.assign({}, state, {
        error: action.payload.message,
        token: '',
        auth: false
      });

    case USER_SESSION_RESTORE:
      return Object.assign({}, state, action.payload, {
        error: ''
      });

    case USER_LOG_OUT:
      return Object.assign({}, state, {
        auth: false,
        token: '',
        error: action.payload.message
      });

    default:
      return state;
  }
}

export default sessionReducer;
