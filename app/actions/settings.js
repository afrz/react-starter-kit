//WAA : read settings of given user
function fetchSettings(user) {

  return {
    type: 'SETTINGS',
    api: {
      endpoint: `/settings/${user}/`
    }
  };
}

//RAA : load settings of current user
export function loadSettings() {

  return (dispatch, getState) => {

    const { session: { user, token } } = getState();
    //because settings webservice is called early in initialization flow, we shall manually ensure that token exists.
    if (!token) return;

    return dispatch(fetchSettings(user));
  };
}
