import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Grid from 'react-bootstrap/lib/Grid';

import PasswordBox from './PasswordBox';

//Authentication form
const LoginForm = React.createClass({

  propTypes : {
    defaultLogin: PropTypes.string,
    defaultInstance: PropTypes.string,
    lockInstance: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    instances: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      loadInstances: PropTypes.func.isRequired,
      loginUser: PropTypes.func.isRequired
    })
  },

  //ensure that props from connected container are synced with local state
  syncLocalStateFromProps({defaultLogin, defaultInstance, errorMessage}){
    return {
      login: defaultLogin || '',
      instance: defaultInstance,
      message: errorMessage
    };
  },

  getInitialState: function() {
    //init internal state
    return this.syncLocalStateFromProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    //update internal sate
    this.setState(this.syncLocalStateFromProps(nextProps));
  },

  componentDidMount: function() {
    //loading instances
    this.props.actions.loadInstances();
  },

  onKeyPress: function(event) {
    if (event.key === 'Enter') {
      //try to login on ENTER key
      this.login();
    }
  },

  login: function () {
    //try authentication
    this.props.actions.loginUser(this.state.instance, this.state.login, this.refs.password.getPassword());
  },

  render: function() {
    return (
      <Grid>
        <form className="form-signin">
          <h2 className="text-primary">ZenCloud</h2>
          <FormGroup bsSize="large" controlId="login">
            <FormControl type="text"
              placeholder="Identifiant"
              value={this.state.login}
              onChange={(e) => this.setState({login: e.target.value, message: ''})}
              onKeyPress={this.onKeyPress} />
          </FormGroup>
          <PasswordBox
            ref="password"
            size="large"
            onKeyPress={this.onKeyPress}
            onChange={() => this.setState({message: ''})} />
          <FormGroup bsSize="large" controlId="instance" style={this.props.lockInstance ? { display : 'none' } : {}}>
            <FormControl componentClass="select"
              value={this.state.instance}
              onChange={(e) => this.setState({instance: e.target.value, message: ''})} >
              {this.props.instances.map((instance) =>
                <option key={instance.Id} value={instance.Id}>{instance.DisplayLabel}</option>
              )}
            </FormControl>
          </FormGroup>
          <Button block bsStyle="primary" bsSize="large" onClick={this.login} disabled={this.state.login ? false : true}>
            Connexion&nbsp;&nbsp;<Glyphicon glyph="log-in"/>
          </Button>
          <br/>
          { this.state.message ? <Panel bsStyle="danger"><h4 className="text-danger text-center">{this.state.message}</h4></Panel> : null }
        </form>
      </Grid>
    );
  }
});

export default LoginForm;
