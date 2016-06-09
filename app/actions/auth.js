import SecurityManager from '../utils/security';
import { USER_LOG_OUT, USER_SESSION_RESTORE } from '../constants/actionTypes';
// import { loadSettings } from './settings';

//WAA : read instances
function fetchInstances() {
  return {
    type: 'INSTANCES',
    api: {
      endpoint: "/instances",
      options: {
        restricted: false
      }
    }
  };
}

//RAA : load available instances
export function loadInstances() {

  return (dispatch, getState) => {

    const { instances } = getState();

    if (instances.length > 0) {
      return null;
    }
    //only fetch instances if not already done
    return dispatch(fetchInstances());
  };
}

//WAA : check user authentication
const authenticateUser = (Instance, Login, Password) => {

  //just encode password to base 64
  const pwd = window.btoa(Password);

  return {
    type: 'AUTH',
    api: {
      method: 'CREATE',
      endpoint: "/auth",
      options: {
        restricted: false
      }
    },
    payload: {
      Login,
      Instance,
      Password: pwd
    }
  };
};

//RAA : proceed to user login
export const loginUser = (instance, login, password) => {

  return (dispatch) => {

    return dispatch(authenticateUser(instance, login, password))
      .done((jwt) => { dispatch(restoreSession(jwt)); })
      .fail(() => {
        //force logout when authentication fails to remove any trace of key/token
        logoutUser();
      });
  };
}

/** FSA : proceed to user exit
  @param message : string to display when user logs out
*/
export const logoutUser = (message = '') => {

  SecurityManager.logout();
  return {
    type: USER_LOG_OUT,
    payload: {
      message
    }
  };
};

/** FSA : restore user from token if provided, otherwise from local storage
  @param token (string) : JWT token
*/
const restoreUser = (token) => {

  const policy = SecurityManager;
  if (token) {
    //if a token is provided, store it before restoring session
    policy.storeCredentials(token);
  }

  return {
    type: USER_SESSION_RESTORE,
    payload: {
      auth: policy.authorized(),
      user: policy.login,
      instance: policy.instance,
      token: policy.jwt
    }
  };
};

/** RAA : restore session (user + settings) from token if provided, otherwise from local storage
  @param token (string) : JWT token
*/
export const restoreSession = (token) => {

  return (dispatch) => {

    //restore user
    dispatch(restoreUser(token));

    //and load settings
    //return dispatch(loadSettings());
  };
}
