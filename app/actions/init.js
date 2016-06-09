import { restoreSession } from './auth';

//WAA : read local configuration
function fetchConfig() {
  return {
    type: 'CONFIG',
    api: {
      endpoint: "/config.json",
      options: {
        restricted: false
      }
    }
  };
}

//RAA : intialize actions flow
export function initFlow() {

  return (dispatch) => {

    //retrieve configuration file
    return dispatch(fetchConfig()).done(() => {

      //then try to restore session
      dispatch(restoreSession());
    });
  };
}
