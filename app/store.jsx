import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import webapi from './api/web-api';
import rootReducer from './reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, webapi)
  );
}
