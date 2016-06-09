import 'utils/polyfills';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './containers/Root';

import configureStore from './store';
import configureRoutes from './routes';

const store = configureStore();
const routes = configureRoutes(store);

import { initFlow } from './actions/init';

store.dispatch(initFlow()).done(() => {

  //application render
  render(
    <Root store={store} history={browserHistory} routes={routes}/>,
    document.getElementById('root')
  );
});
