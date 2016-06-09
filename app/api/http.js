import $ from 'jquery';

/** HTTP FETCH implementation
  see https://fetch.spec.whatwg.org/
  @param uri (string) : full URL endpoint
  @param method (string) : HTTP verb
  @param payload (object): to send to server
  @param options (object) : options to customize XHR
  @param token (string) : JWT session token
*/
export default function fetch(uri, method = 'GET', payload = null, options = {}, token = '') {

  let settings = {
    method,
    dataType: 'json'
  };

  if (payload) {

    if (payload instanceof FormData) {
      //specific case for form data
      settings.contentType = false;
      settings.data = payload;
      settings.xhr = customizeXHR(options);

    } else {
      //default JSON-request options
      settings.contentType = 'application/json';
      //data to be sent to the server. Appended to the url query string for GET-requests.
      settings.data = settings.method === 'GET' ? payload : JSON.stringify(payload);
    }
  }

  if (settings.method !== 'GET') {
    //do not process data on a non-GET request
    settings.processData = false;
  }

  //add token if provided
  if (token) {
    settings.headers = {
      'Authorization': `Bearer ${token}`
    };
  }

  //proxy to jquery ajax
  return $.ajax(uri, settings);
}

/**
  Enhance AJAX calls using given options.
  @param options (object)
  @return function that shall returns an enhanced XMLHttpRequest instance.
*/
const customizeXHR = (options) => () => {

  //create XHR through default factory
  let xhr = $.ajaxSettings.xhr();

  const { onProgress } = options;
  if (onProgress) {
    //register progress event
    xhr.upload.addEventListener("progress", function(evt) {
      //compute progress and notify
      if (evt.lengthComputable) {
        const percent = Math.floor(evt.loaded / evt.total * 100);
        onProgress(percent);
      }
    }, false);
  }
  return xhr;
};
