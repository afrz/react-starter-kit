import { combineReducers } from 'redux';

import config from './config';
import session from './session';
import instances from './instances';
import settings from './settings';
import notifications from './notifications';

export default combineReducers({
  config,
  session,
  instances,
  settings,
  notifications
});
