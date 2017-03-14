import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('../../style/header.scss');

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign out</Link>
        </li>
      );
    }
      // show a link to sign in or sign up
    return [
      <li className="nav-item" key={1}>
        <Link to="/signin" className="nav-link">Sign in</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link to="/signup" className="nav-link">Sign up</Link>
      </li>,
    ];
  }
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <Link to="/" className="navbar-brand mb-0">Adam2Eve</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Header);
