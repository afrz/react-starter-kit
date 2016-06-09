import { MESSAGE_NOTIFY, MESSAGES_CLEAR } from '../constants/actionTypes';

/** FSA : log a new message notification
  @param message (string) : text message to log
  @param title (string) : title of log message
  @param level (string) : gravity level (success, warning, danger, info)
*/
export function logMessage(message, title = '', level = 'info') {

  return {
    type: MESSAGE_NOTIFY,
    payload: {
      message,
      title,
      level
    }
  };
}

/** FSA : notify an internal error
  @param error (object) : XHR failure error
*/
export function logInternalError(error) {

  return logMessage(
    error.responseText || `${error.statusText} : veuillez-contacter votre administrateur.`,
    `Erreur interne code ${error.status}`,
    'danger'
  );
}

//FSA : clear all message notifications
export function clearMessages() {

  return {
    type: MESSAGES_CLEAR
  };
}
