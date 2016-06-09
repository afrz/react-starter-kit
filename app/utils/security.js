/**
  Manage credentials access using local storage
*/
const SecurityManager = {

  //restore user credentials
  instance: localStorage['SM.instance'],
  login: localStorage['SM.login'],
  jwt: localStorage['SM.jwt'],

  //check if credentials have already been accredited once
  authorized: function() {
    return (this.jwt !== undefined);
  },

  //extract payload information from token
  extractPayload: function(jwt) {

    let payload = {};
    try {
      //extract
      const parts = jwt.split('.');
      payload = JSON.parse(atob(parts[1]));

    } catch (e) { /*ignore*/ }

    //and store
    localStorage['SM.instance'] = this.instance = payload.instance || '';
    localStorage['SM.login'] = this.login = payload.login || '';
  },

  //compute redentials from token
  storeCredentials: function(jwt) {

    this.logout(true);
    //store token
    localStorage['SM.jwt'] = this.jwt = jwt;
    this.extractPayload(jwt);
  },

  //clean stored credentials
  logout: function(cleanCreds) {

    //keep info for future access
    if (cleanCreds) {
      localStorage.removeItem('SM.instance');
      this.instance = null;

      localStorage.removeItem('SM.login');
      this.login = null;
    }

    //but always remove token
    localStorage.removeItem('SM.jwt');
    this.jwt = null;
  }
};

export default SecurityManager;
