import React, { PropTypes } from 'react';

import { IndexLinkContainer } from 'react-router-bootstrap';

import Badge from 'react-bootstrap/lib/Badge';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown  from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const AppBar = React.createClass({

  propTypes: {
    user : PropTypes.string.isRequired,
    info : PropTypes.shape({
      unreadMessages: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      logoutUser: PropTypes.func.isRequired
    })
  },

  logout : function() {
    this.props.actions.logoutUser();
  },

  render: function() {

    const userTitle = <span><Glyphicon glyph="user"/>&nbsp;&nbsp;{this.props.user}</span>;
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><img className="navbar-brand-image" src="/images/favicon.png"/>ZenCloud</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>
                <Glyphicon glyph="home"/>&nbsp;&nbsp;Accueil
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/inbox">
              <NavItem eventKey={2}>
                {this.props.info.unreadMessages > 0 ? <Badge style={{display:"inline"}} className="badge-info">{this.props.info.unreadMessages}</Badge> : <Glyphicon glyph="envelope"/>}
                &nbsp;&nbsp;Messages
              </NavItem>
            </IndexLinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown title={userTitle} id="nav-appbar-dropdown">
              <MenuItem onClick={this.logout}>
                <Glyphicon glyph="off"/>&nbsp;Déconnexion
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

export default AppBar;
