import React, { PropTypes } from 'react';

import AppBar from './AppBar';
import NotifyContainer from '../notifications/NotifyContainer';

/**
  Workspace wrapped into a 'restricted access' area
  High Order Component pattern.
  @param AuthorizationComponent (component) : Application signin form
*/
const RestrictedWorkspace = function(AuthorizationComponent) {

  //Workspace Component
  const Workspace = React.createClass({

    propTypes: {
      auth: PropTypes.bool.isRequired,
      user: PropTypes.string,
      settings : PropTypes.object.isRequired,
      info : PropTypes.object.isRequired,
      paths: PropTypes.shape({
        iconography: PropTypes.string.isRequired
      }),
      actions: PropTypes.shape({
        logoutUser: PropTypes.func.isRequired
      }),
      //injected by React Router through 'App'
      children: PropTypes.node.isRequired
    },

    childContextTypes: {
      getIcoPath : PropTypes.func,
      settings: PropTypes.object
    },

    //create a global context to pass info to all component hierarchy
    getChildContext() {
      //path to iconography folder
      return {
        getIcoPath : this.getIconographyPath,
        settings : this.props.settings
      };
    },

    //compute fulle path to iconography element
    getIconographyPath(relativePath) {

      return relativePath ? this.props.paths.iconography + relativePath : '';
    },

    render() {

      let workspace;
      //check if access is granted
      if (this.props.auth) {
        //with default workspace with navigation bar + remaining stuff
        workspace = (
          <div>
            <AppBar user={this.props.user} info={this.props.info} actions={this.props.actions}></AppBar>
            <div>{this.props.children}</div>
            <NotifyContainer />
          </div>
        );
      } else {
        //otherwise replace with Authorization Component...
        workspace = <AuthorizationComponent/>;
      }
      return <div>{workspace}</div>;
    }
  });
  return Workspace;
};

export default RestrictedWorkspace;
