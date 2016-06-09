import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

//Password input
const PasswordBox = React.createClass({

  propTypes : {
    size: PropTypes.string,
    //timeout (in milliseconds)
    autoHideTimeout: PropTypes.number
  },

  //reference to current timer
  timer : null,

  getDefaultProps() {
    return {
      size : "small",
      autoHideTimeout : 3000
    }
  },

  getInitialState: function() {
    return { hidden : true };
  },

  componentWillUnmount() {
    this.cleanTimer();
  },

  cleanTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  //display or not password
  displayPassword() {

    this.setState({
      hidden : !this.state.hidden
    })

    if (this.state.hidden) {
      this.registerAutoHide();
    }
  },

  //register the timer to automatically hide the password
  registerAutoHide() {

    this.cleanTimer();
    this.timer = setTimeout(() => this.setState({ hidden : true }), this.props.autoHideTimeout);
  },

  //retrieve password
  getPassword() {

    return ReactDOM.findDOMNode(this.refs['password']).value;
  },

  render: function() {
    return (
      <FormGroup bsSize={this.props.size} controlId="password">
        <InputGroup>
          <FormControl type={this.state.hidden ? "password" : "text"}
            placeholder="Mot de passe"
            ref="password"
            {...this.props} />
          <InputGroup.Button>
            <Button
              bsSize={this.props.size}
              title="Affiche ou non le mot de passe"
              onClick={this.displayPassword}>
              <Glyphicon glyph={this.state.hidden ? "eye-open" : "eye-close"}/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
});

export default PasswordBox;
