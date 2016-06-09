/** FSA : Flux Standard Action.
  https://github.com/acdlite/flux-standard-action
  Synchronous. Will be interpreted directly by state reducers.
  Action Creator must return an object defined by :
  @param type (string) : the type of an action identifies to the consumer the nature of the action that has occurred.
  @param payload (object or error) : it represents the payload of the action.
  @param error (boolean) : true if the action represents an error. If true, the payload SHOULD be an error object.
  @param meta (object) : optionnal, it is intended for any extra information that is not part of the payload.
*/

/** WAA : Web API Action.
  Will be interpreted by WEB-API custom middleware. Dispatched WAA returns a XHR promise.
  Action Creator must return a FSA with an 'api' property :
  @param api (object) :
    - @param endpoint (string) : web service relative URL
    - @param method (string) : READ (default), CREATE, UPDATE, PATCH, DELETE
    - @param options (object) : Optional. Web service specific configuration.
        - @param restricted (bool) : true if web service requires an authentification
        - @param onProgress (function) : upload progress notification handler
*/

/** RAA : Redux Asynchronous Action.
  http://redux.js.org/docs/advanced/AsyncActions
  Will be interpreted by Redux Thunk middleware.
  Action Creator must return a function (dispatch, getState) that might dispatch a FSA/WAA.
*/

//authentication
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_SESSION_RESTORE = 'USER_SESSION_RESTORE';

//logging & notifications
export const MESSAGE_NOTIFY = 'MESSAGE_NOTIFY';
export const MESSAGES_CLEAR = 'MESSAGES_CLEAR';
