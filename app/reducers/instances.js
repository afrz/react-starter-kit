function instancesReducer(state = [], action) {

  if (action.type === 'INSTANCES_READ_RESPONSE') {
    return action.payload;
  }
  return state;
}

export default instancesReducer;