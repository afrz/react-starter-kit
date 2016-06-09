function configReducer(state = {}, action) {

  if (action.type === 'CONFIG_READ_RESPONSE') {
    return action.payload.config;
  }
  return state;
}

export default configReducer;