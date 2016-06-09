import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import Ex404 from './components/common/Ex404';

import { restoreSession } from './actions/auth';

// <IndexRoute component={Dashboard} />
// <Route path="inbox" component={Inbox} />
//<Route path="*" component={Ex404} />

export default function configureRoutes(store) {

  //verify the authentication before component routing
  const checkAuth = function(nextState, replace) {

    //check if a token is provided
    const token = nextState.location.query.token;
    if (token) {
      //then restore session with token
      store.dispatch(restoreSession(token));
      //and redirect with same URL (but without the token in query string)
      replace(nextState.location.pathname);
    }
  };

  return (
    <Route path="/" component={App} onEnter={checkAuth}>
      <IndexRoute component={Ex404} />
    </Route>
  );
}
