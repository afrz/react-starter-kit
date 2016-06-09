const initialState = {};

//global state tree contains key value pairs of static settings
function settingsReducer(state = initialState, action) {

  switch (action.type) {

    case 'SETTINGS_READ_RESPONSE':
      return action.payload;

    default:
      return state;
  }
}

export default settingsReducer;
