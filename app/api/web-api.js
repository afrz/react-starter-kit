import fetch from './http';
import { selectConfig, selectToken } from '../actions/core';
import { logInternalError } from '../actions/notifications';
import { logoutUser } from '../actions/auth';

/** Compute web-api complete uniform resource location (URL)
  @param state : redux state tree
  @param endpoint : relative web service endpoint
  @param restricted : true if web-service needs authentication token
*/
export const computeURL = (state, endpoint, restricted = false) => {

  let url = endpoint;

  //only add API root when necessary
  const apiRoot = selectConfig(state).webAPI;
  url = (apiRoot && endpoint.indexOf(apiRoot) === -1) ? apiRoot + endpoint : endpoint;
  if (restricted) {
    //add token for restricted API
    url += '/?token=' + selectToken(state);
  }
  return url;
};

//mapping from CRUD method actions to HTTP verbs
const methodMap = {
  'CREATE': 'POST',
  'UPDATE': 'PUT',
  'PATCH': 'PATCH',
  'DELETE': 'DELETE',
  'READ': 'GET'
};

//WEB-API execution (calling)
const callWebApi = (state, endpoint, method, data, options) => {

  //compute final URL
  const url = computeURL(state, endpoint, false);
  //merge options with default ones
  const finalOptions = Object.assign({ restricted: true }, options);
  //and now fetch
  return fetch(url, methodMap[method], data, finalOptions, finalOptions.restricted ? selectToken(state) : '');
};

/**
Redux middleware that interprets actions with 'API' info specified.
Provides an extension point between dispatching an action, and the moment it reaches the reducer.
Performs the web api call and returns promises.
  @param store : redux state tree storage
  @param next : dispatch function for the next middleware
  @param action : current dispatched action
*/
const webApiMiddleware = store => next => action => {

  const api = action.api;
  if (!api) {
    //run next action if not an API action
    return next(action);
  }

  //extract info from action
  let { endpoint, method, options } = api;
  method = method || 'READ';

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  //compute final action
  function actionWith(kind, data) {

    //create next action with its new type : FSA-TYPE_METHOD_(REQUEST|RESPONSE|FAILURE)
    const finalAction = Object.assign({}, action, data, {
      type: `${action.type}_${method}_${kind}`
    });
    //remove api to avoid recursive loops
    delete finalAction.api;
    return finalAction;
  }

  //inform that asynchronous action has started
  next(actionWith('REQUEST', {}));

  //call web api
  const xhr = callWebApi(store.getState(), endpoint, method, action.payload, options);

  //when response comes back
  xhr.done(response => next(actionWith('RESPONSE', {
    payload: response
  })));

  //when fails
  xhr.fail(error => {
    if (error.status === 401) {
      //unauthorized : revoke access
      next(logoutUser('Session expirée ou non autorisée.'));
    } else {
      //logs error
      next(logInternalError(error));
    }

    next(actionWith('FAILURE', {
      error: true,
      payload: new Error(error.responseText)
    }));
  });

  return xhr;
};

export default webApiMiddleware;
